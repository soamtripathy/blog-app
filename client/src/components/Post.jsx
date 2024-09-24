import { format } from "date-fns";

const Post = ({ title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <img src={cover} alt={title} />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author}</a>
          <time>{format(new Date(createdAt), "dd-MM-yyyy, HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
