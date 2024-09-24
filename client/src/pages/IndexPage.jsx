import { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </>
  );
};

export default IndexPage;