import React from "react";
import { useState } from "react";

const Signin = () => {
  const [editedValue, setEditedValue] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValue({
      ...editedValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editedValue);
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="container__center-form">
        <h3>Inscrivez vous</h3>
        <div className="container__auth-fields">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={editedValue.target}
          />
        </div>
        <div className="container__auth-fields">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Pseudonyme"
            onChange={handleChange}
            value={editedValue.target}
          />
        </div>
        <div className="container__auth-fields">
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={editedValue.target}
            placeholder="Mot de passe"
          />
        </div>
        <div className="container__auth-fields">
          <input
            type="password"
            id="checkPassword"
            name="checkPassword"
            placeholder="Vérifiez votre mot de passe"
          />
        </div>
        <div className="btn-container">
          <button type="submit">Valider</button>
        </div>
      </div>
    </form>
  );
};

export default Signin;
