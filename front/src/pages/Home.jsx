import React, { useEffect, useState } from "react";
import Posts from "../components/pageSpecific/homepage/Posts";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:5173/posts/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const jsonData = await response.json();
        setData(jsonData.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
  }, [data, loading]);

  return (
    <main className="main__home">
      <div className="article-sorter">
        <button
          aria-label="bouton de tri des posts du plus récent au plus vieux"
          className="article-sort__btn"
        >
          Plus récent
        </button>
        <button
          aria-label="bouton de tri des posts les plus populaires"
          className="article-sort__btn"
        >
          Plus populaire
        </button>
        <button
          aria-label="bouton de tri des posts les plus populaires cette semaine"
          className="article-sort__btn"
        >
          Populaire de la semaine
        </button>
      </div>

      <div className="container__forum-articles">
        {loading ? <p>Loading...</p> : <Posts data={data} />}
      </div>
    </main>
  );
};

export default Home;
