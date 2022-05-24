const { Router } = require("express");
const router = Router();
const { PostComments, User } = require("../db.js");

router.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { comments, likes, userId } = req.body;

  try {
    if (!comments || !userId) {
      return res.status(400).json({ msg: "Faltan campos requeridos." });
    }

    await PostComments.create({
      comments: comments,
      likes: likes,
      postId: postId,
      userId: userId,
    });
    res.status(200).send("Comentario creado correctamente.");
  } catch (err) {
    res.status(400).send({ msg: "Error intente de nuevo" });
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await PostComments.findAll({
      where: {
        postId: postId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "image"],
          exclude: [
            "password",
            "email",
            "phone",
            "birthdate",
            "gender",
            "role",
          ],
        },
      ],
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).send("Comentarios no encontrados.");
  }
});

router.put("/:postId/:id", async (req, res) => {
  const { postId, id } = req.params;
  const { comments, likes, userId } = req.body;
  try {
    const postComments = await PostComments.update(
      {
        comments: comments,
        likes: likes,
        userId: userId,
      },
      {
        where: {
          postId: postId,
          id: id,
        },
      }
    );

    res.status(200).send("Comentario actualizado.");
  } catch (err) {
    res.status(400).send("No se pudo modificar.");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ msg: "No se recibió id" });
    }

    await PostComments.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).send("Comentario eliminado.");
  } catch (err) {
    res.status(400).send({ msg: "No se pudo eliminar." });
  }
});

module.exports = router;
