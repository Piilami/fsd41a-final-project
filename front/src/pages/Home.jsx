import React from "react";
import Header from "../components/shared/Header";
import Posts from "../components/pageSpecific/Posts";

const Home = () => {
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
        <Posts />
      </div>
    </main>
  );
};

export default Home;
