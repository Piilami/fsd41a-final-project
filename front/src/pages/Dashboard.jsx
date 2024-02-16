import React from "react";

const Dashboard = () => {
  return (
    <main className="main__dashboard">
      <div className="container__dashboard-menu">
        <div className="container__switch-btn">
          <button className="switch-btn">modérer les posts</button>
          <button className="switch-btn">modérer les utilisateurs</button>
          <button className="switch-btn">Création utilisateur</button>
        </div>
        <div className="container__list-content">
          <h2 className="title-list">liste à modérer</h2>
          <adminCard />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
