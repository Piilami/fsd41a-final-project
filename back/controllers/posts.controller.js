import Posts from "../models/Posts.js";
import jwtoken from "jsonwebtoken";

const createPosts = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  const authToken = token.split(" ")[1];

  try {
    const decodedToken = jwtoken.verify(authToken, process.env.SECRET_TOKEN);
    const { _id, username } = decodedToken;

    const timestamp = Date.now().toString();
    const newPost = new Posts({
      _id: timestamp,
      title: req.body.title,
      content: req.body.content,
      pictures: req.body.pictures || [],
      video: req.body.video || [],
      author: { id: _id, username: username } || { id: "", username: "" },
      date: new Date(),
      votes: {},
      responses: [],
    });

    newPost
      .save()
      .then(() => {
        res.status(201).json({ message: "Post créé avec succès" });
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ message: "Erreur serveur lors de la création du post" });
      });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

const readPosts = (req, res, next) => {
  Posts.find()
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(404).json({ message: error }));
};

const getOnePost = (req, res, next) => {
  Posts.findOne({ _id: req.params.id })
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ message: error });
    });
};

const updatePosts = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  const authToken = token.split(" ")[1];

  try {
    const decodedToken = jwtoken.verify(authToken, process.env.SECRET_TOKEN);
    const decodedTokenId = decodedToken._id;

    Posts.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.author.id !== decodedTokenId) {
          return res.status(401).json({
            message: "Vous n'êtes pas autorisés à faire cette action",
          });
        } else {
          const { _id, author, votes, responses, ...updateFields } = req.body;
          Posts.updateOne({ _id: req.params.id }, { ...updateFields })
            .then(() => {
              res.status(200).json({ message: "Post mis à jour avec succès" });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ message: error });
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ message: "Erreur serveur lors de la mise à jour du post" });
      });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

const deletePost = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  const authToken = token.split(" ")[1];

  try {
    const decodedToken = jwtoken.verify(authToken, process.env.SECRET_TOKEN);
    const decodedTokenId = decodedToken._id;

    Posts.findOne({ _id: req.params.id }).then((post) => {
      if (post.author.id !== decodedTokenId) {
        return res
          .status(401)
          .json({ message: "Vous n'êtes pas autorisés à faire cette action" });
      } else {
        Posts.deleteOne({ _id: req.params.id })
          .then(() => {
            return res
              .status(201)
              .json({ message: "Suppression du post réussie" });
          })
          .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: error });
          });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

const votes = (req, res, next) => {
  const { type } = req.body;
  const postId = req.params.id;

  if (!type || !req.user._id) {
    return res
      .status(400)
      .json({ message: "Type de vote ou utilisateur manquant" });
  }

  Posts.findOne({ _id: postId })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
      }

      let updatedVotes = { ...post.votes };

      switch (type) {
        case "upvote":
          updatedVotes = handleUpvote(updatedVotes, req.user._id);
          break;
        case "downvote":
          updatedVotes = handleDownvote(updatedVotes, req.user._id);
          break;
        default:
          return res.status(400).json({ message: "Type de vote invalide" });
      }

      Posts.updateOne({ _id: postId }, { votes: updatedVotes })
        .then(() => {
          res.status(200).json({ message: "Vote enregistré avec succès" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: error });
        });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erreur serveur lors de la recherche du post" });
    });
};

const handleUpvote = (votes, userId) => {
  let updatedUpvotes = votes.upvote;
  if (!votes.upvote.includes(userId)) {
    updatedUpvotes = [...votes.upvote, userId];
  }
  const updatedDownvotes = votes.downvote.filter((id) => id !== userId);
  return {
    upvote: updatedUpvotes,
    downvote: updatedDownvotes,
  };
};
const handleDownvote = (votes, userId) => {
  let updatedDownvotes = votes.downvote;
  if (!votes.downvote.includes(userId)) {
    updatedDownvotes = [...votes.downvote, userId];
  }
  const updatedUpvotes = votes.upvote.filter((id) => id !== userId);
  return {
    upvote: updatedUpvotes,
    downvote: updatedDownvotes,
  };
};

const commentPost = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  const authToken = token.split(" ")[1];

  try {
    const decodedToken = jwtoken.verify(authToken, process.env.SECRET_TOKEN);
    const { _id, username } = decodedToken;
    const postId = req.params.id;
    const { content } = req.body;
    const comment = {
      userId: _id,
      authorUsername: username,
      content: content,
    };

    Posts.findOneAndUpdate(
      { _id: postId },
      { $push: { responses: comment } },
      { new: true }
    )
      .then((updatedPost) => {
        if (!updatedPost) {
          return res.status(404).json({ message: "Post non trouvé" });
        }
        res.status(201).json({
          message: "Commentaire ajouté avec succès",
          updatedPost,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          message: "Erreur serveur lors de l'ajout du commentaire",
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

export default {
  createPosts,
  readPosts,
  getOnePost,
  updatePosts,
  deletePost,
  votes,
  commentPost,
};
