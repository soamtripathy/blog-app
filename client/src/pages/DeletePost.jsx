import { useNavigate, useParams } from "react-router-dom";

const DeletePost = () => {
  const navigate = useNavigate();
  const params = useParams();

  const id = params.id;


  async function deletePost() {
    try {
      const response = await fetch("http://localhost:8000/post/" + id, {
        method: "DELETE",
        credentials: "include",
      });
      console.log("Response:", response);
      if (response.ok) {
        // Redirect to another page or update the UI after successful deletion
        navigate("/"); // Redirect to the posts list page
      } else {
        console.error(
          "Failed to delete the post:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="delete">
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
};

export default DeletePost;