import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/shared/Header";
import Login from "../pages/Login";
import Profil from "../pages/Profil";
import Dashboard from "../pages/Dashboard";
import Signin from "../pages/Signin";
import Error from "../pages/Error";
import AuthManager from "../components/shared/AuthManager";

function App() {
  return (
    <>
      <AuthManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
