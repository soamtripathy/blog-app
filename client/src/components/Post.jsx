

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="texts">
        <h2>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
          perferendis rerum esse nobis maxime, hic culpa. Ipsam rerum, sequi ad
          facere esse consequatur quae hic.
        </h2>
        <p className="info">
          <a className="author">Soam Tripathy</a>
          <time>2024-09-23 10:15</time>
        </p>
        <p className="summary">
          {" "}
          Rerum nobis id, ab perferendis officiis autem molestias facere fugit
          ratione? Ad rem mollitia sunt nam perferendis modi et temporibus
          veniam asperiores dolore, obcaecati, recusandae placeat nulla odio
          itaque odit at aperiam quasi unde minima.
        </p>
      </div>
    </div>
  );
};

export default Post;
