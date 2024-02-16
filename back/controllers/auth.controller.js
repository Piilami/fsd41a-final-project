import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res, next) => {
  try {
    const checkExistingUser = await User.findOne({ email: req.body.email });
    if (checkExistingUser) {
      res.status(400).json({ message: "Adresse email déjà utilisée" });
    } else {
      bcrypt
        .hash(req.body.password, parseInt(process.env.SALT))
        .then((hashedPswd) => {
          const id = Date.now();
          const newUser = new User({
            _id: id,
            email: req.body.email,
            username: req.body.username,
            password: hashedPswd,
          });
          newUser
            .save()
            .then(() => {
              res.status(201).json({ message: "Utilisateur créé avec succès" });
            })
            .catch((error) => {
              console.error(error);
              return res.status(500).json({ message: error });
            });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ message: error });
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "erreur" });
  }
};

const login = (req, res, next) => {
  if (req.body.email) {
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (user) {
          bcrypt
            .compare(req.body.password, user.password)
            .then((pswd) => {
              if (pswd) {
                const token = jwtoken.sign(
                  {
                    _id: user._id,
                    username: user.username,
                    isAdmin: user.status,
                  },
                  process.env.SECRET_TOKEN,
                  { expiresIn: "1h" }
                );
                user.token = token;
                user
                  .save()
                  .then(() => {
                    return res.status(201).json({
                      message: "Connexion réussie",
                      username: user.username,
                      token: token,
                    });
                  })
                  .catch((error) => {
                    console.error(error);
                    res
                      .status(500)
                      .json({ message: "Erreur serveur lors de la connexion" });
                  });
              } else {
                res.status(401).json({ message: "Mot de passe incorrect" });
              }
            })
            .catch((error) => {
              console.error(error);
              res
                .status(500)
                .json({ message: "Erreur serveur lors de la connexion" });
            });
        } else {
          res.status(404).json({ message: "Utilisateur non trouvé" });
        }
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ message: "Erreur serveur lors de la connexion" });
      });
  }
};

const logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Utilisateur déconnecté avec succès" });
};

export default {
  register,
  login,
  logout,
};
