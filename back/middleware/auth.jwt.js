import jwtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authJWTCheck = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  try {
    const decoded = jwtoken.verify(token, process.env.SECRET_TOKEN);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTimestamp) {
      return res
        .status(401)
        .json({ message: "Accès non autorisé - Token expiré" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé - Token invalide" });
  }
};

export default authJWTCheck;
