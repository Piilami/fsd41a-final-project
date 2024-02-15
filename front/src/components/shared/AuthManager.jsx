import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    const isValidToken = checkTokenValidity(token);
    if (
      !isValidToken &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signin"
    ) {
      navigate("/login");
    }
  }, [navigate]);

  const getAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (token) {
      return token.split("=")[1];
    }
    return null;
  };

  const checkTokenValidity = (token) => {
    if (token) {
      const decodedToken = parseJwt(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTimestamp;
    }
    return false;
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return {};
    }
  };

  return null;
};

export default AuthManager;
