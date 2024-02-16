import React, { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [editedValue, setEditedValue] = useState({
    email: "",
    username: "",
    password: "",
    checkPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValue({
      ...editedValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editedValue.password !== editedValue.checkPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5173/auth/register", {
        email: editedValue.email,
        username: editedValue.username,
        password: editedValue.password,
      });
      console.log(response.data);
      window.location.href = "/login";
      setErrorMessage(
        "Inscription réussie. Vous pouvez maintenant vous connecter."
      );
    } catch (error) {
      console.error(
        "Erreur lors de l'inscription:",
        error.response.data.message
      );
      setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="container__center-form">
        <h3>Inscrivez-vous</h3>
        <div className="container__auth-fields">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={editedValue.email}
            required
          />
        </div>
        <div className="container__auth-fields">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Pseudonyme"
            onChange={handleChange}
            value={editedValue.username}
            required
          />
        </div>
        <div className="container__auth-fields">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            value={editedValue.password}
            required
          />
        </div>
        <div className="container__auth-fields">
          <input
            type="password"
            id="checkPassword"
            name="checkPassword"
            placeholder="Vérifiez votre mot de passe"
            onChange={handleChange}
            value={editedValue.checkPassword}
            required
          />
        </div>
        <div className="btn-container">
          <button type="submit">Valider</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </form>
  );
};

export default Signin;
