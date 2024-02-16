import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ data }) => {
  return (
    <>
      {data.map((post) => (
        <Link
          key={post._id}
          to={`/post/${post._id}`}
          className="forum-post-link"
        >
          <article className="forum-post">
            <h3 className="article-title">{post.title}</h3>
            <div className="container__post">
              <div className="container__content">
                <p className="text">{post.content}</p>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </>
  );
};

export default Posts;
