import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="login-form">
      <div className="container__center-form">
        <h3>Connectez vous</h3>
        <div className="container__auth-fields">
          <input type="email" id="email" name="email" placeholder="Email" />
        </div>
        <div className="container__auth-fields">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
          />
        </div>
        <div className="btn-container">
          <button type="submit">Valider</button>
        </div>
      </div>
    </form>
  );
};
export default Login;
