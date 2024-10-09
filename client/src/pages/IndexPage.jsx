import Post from "../components/Post.jsx";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://blog-app-server-cyan.vercel.app/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}
