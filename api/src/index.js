import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { Post } from "../models/post.model.js";

import path from "path";

const app = express();

const uploadMiddleware = multer({ dest: "uploads/" });

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res)=> {
  res.json("Hello")
})

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(userDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign(
      { username, id: userDoc._id },
      process.env.ACCESS_TOKEN_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    return null;
  }
};

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  try {
    const { path } = req.file;
    const result = await uploadOnCloudinary(path);

    if (!result) {
      return res.status(400).json({ error: "Failed to upload image" });
    }

    const { token } = req.cookies;
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      {},
      async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
          title,
          summary,
          content,
          cover: result.secure_url,
          author: info.id,
        });

        res.json(postDoc);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newCoverUrl = null;
  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    if (result) {
      newCoverUrl = result.secure_url;
    }
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }

    if (newCoverUrl && postDoc.cover) {
      const publicId = postDoc.cover.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }

    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    postDoc.cover = newCoverUrl ? newCoverUrl : postDoc.cover;

    await postDoc.save();

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  console.log(postDoc);
  res.json(postDoc);
});

app.delete("/post/:id", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, info) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    try {
      const postDoc = await Post.findById(id);
      if (!postDoc) {
        return res.status(404).json({ error: "Post not found" });
      }

      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(403).json({ error: "You are not the author" });
      }

      if (postDoc.cover) {
        const publicId = postDoc.cover.split("/").pop().split(".")[0];
        await deleteFromCloudinary(publicId);
      }

      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on ${process.env.PORT || 8000}`);
});
