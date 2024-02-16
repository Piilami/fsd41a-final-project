import React, { useState, useEffect } from "react";
import axios from "axios";

const Post = () => {
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = window.location.href;
    const postId = url.substring(url.lastIndexOf("/") + 1);

    axios
      .get(`http://127.0.0.1:5173/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
        setLoading(false);
      });
  }, []);

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:5173/posts/${post._id}/comment`,
        {
          content: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Mettre à jour le post avec le nouveau commentaire
      setPost((prevPost) => ({
        ...prevPost,
        responses: [...prevPost.responses, response.data],
      }));
      // Réinitialiser le contenu du commentaire
      setCommentContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <main className="main__post">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <article className="container__article">
            <h2 className="title-article">{post.title}</h2>
            <p className="content-article">{post.content}</p>
            <div className="container__votes">
              <button className="btn-votes">+</button>
              <p className="nbr-votes">0</p>
              <button className="btn-votes">-</button>
            </div>
          </article>

          <section className="container__comments">
            <form className="form-add-comments" onSubmit={handleSubmitComment}>
              <input
                type="text"
                className="input-add-comments"
                placeholder="Ajoutez votre commentaire"
                value={commentContent}
                onChange={handleCommentChange}
              />
              <button type="submit" className="submit-comments-btn">
                +
              </button>
            </form>
            <ul>
              {post.responses.map((comment, index) => (
                <li key={index}>{comment.content}</li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
};

export default Post;
