import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5173/auth/login",
        formData
      );

      const token = response.data.token;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("token", token);

      console.log(response.data);
      window.location.href = "/";
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="container__center-form">
        <h3>Connectez-vous</h3>
        <div className="container__auth-fields">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="container__auth-fields">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
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
