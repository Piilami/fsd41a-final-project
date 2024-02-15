import User from "../models/User.js";
import jwtoken from "jsonwebtoken";

const getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

const updateOneUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "accès non autorisé" });
  }
  const decodedTokenId = jwtoken.verify(token, process.env.SECRET_TOKEN)._id;
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id.toString() !== decodedTokenId) {
        res.status(401).json({
          message: "Vous n'êtes pas autorisés à effectuer cette action",
        });
      } else {
        const { lastname, firstname, birthday, country } = req.body;
        user.lastname = lastname;
        user.firstname = firstname;
        user.birthday = birthday;
        user.country = country;
        user
          .save()
          .then((updatedUser) => {
            res.status(200).json({
              message: "Utilisateur mis à jour avec succès",
              updatedUser,
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({
              message: "Erreur serveur lors de la mise à jour de l'utilisateur",
            });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: error });
    });
};

const deleteOneUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "accès non autorisé" });
  }
  const decodedTokenId = jwtoken.verify(token, process.env.SECRET_TOKEN)._id;

  User.findOne({ _id: req.params.id }).then((user) => {
    if (!user) {
      return res.status(401).json({
        message: "Vous n'êtes pas autorisé à effectuer cette action",
      });
    }

    if (user._id.toString() !== decodedTokenId) {
      return res.status(401).json({
        message: "Vous n'êtes pas authorisés à faire cette action",
      });
    } else {
      User.deleteOne({ _id: req.params.id })
        .then(() => {
          return res
            .status(200)
            .json({ message: "Compte supprimé avec succès" });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ message: error });
        });
    }
  });
};

export default {
  getOneUser,
  updateOneUser,
  deleteOneUser,
};
