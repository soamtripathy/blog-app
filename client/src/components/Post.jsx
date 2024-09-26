import { format } from "date-fns";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  console.log(author); // Debugging line to check the author prop
  return (
    <div className="post">
      <Link to={`/post/${_id}`}>
        <img src={"http://localhost:8000/" + cover} alt={title} />
      </Link>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author && author.username}</a>
          <time>{format(new Date(createdAt), "dd-MM-yyyy, HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
        <p className="content">{parse(content)}</p>
      </div>
    </div>
  );
};

export default Post;
