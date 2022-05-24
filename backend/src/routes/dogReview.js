const { Router } = require("express");
const { DogReview } = require("../db.js");
const router = Router();

/* Ruta para crear/agregar DogReview */

router.post("/:id/dogreview", (req, res) => {
  const { dogID } = req.params;
  const { description, rating, userID } = req.body;
  DogReview.create({
    description: description,
    rating: rating,
    dogID: dogID,
    userID: userID,
  })
    .then((mensaje) => {
      res.status(201).send("Dog review post correctly");
    })
    .catch((err) => res.status(400).json(err.message));
});

/* Ruta para obtener todas las dogReview. */

router.get("/:id/dogreview", (req, res) => {
  const { dogID } = req.params;
  DogReview.findAll({
    where: {
      dogID: dogID,
    },
    order: [["id", "DESC"]],
  })
    .then((dogreview) => res.status(200).json(dogreview))
    .catch((err) => res.status(400).json(err.message));
});

/* Ruta para modificar DogReview */

router.put("/:id/review/:dogReviewID", (req, res) => {
  const { dogID, dogReviewID } = req.params;
  const { description, rating, userID } = req.body;
  DogReview.update(
    { description: description, rating: rating },
    { where: { dogID: dogID, idogReviewIDd: dogReviewID, userID: userID } }
  )
    .then(() => res.status(200).send("Review updated"))
    .catch((err) => res.status(400).json(err.message));
});

/* Ruta para eliminar DogReview */

router.delete("/:dogID/review/:dogReviewID", (req, res) => {
  const { dogID, dogReviewID } = req.params;
  DogReview.destroy({
    where: {
      dogID: dogID,
      dogReviewID: dogReviewID,
    },
  })
    .then((rev) => {
      if (rev > 0) {
        return res.status(200).json({ message: "Review deleted" });
      } else {
        return res.json({ message: "Review not found" });
      }
    })
    .catch((err) => res.status(400).json(err.message));
});

module.exports = router;
