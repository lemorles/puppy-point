const { Router } = require("express");
const { Post, PostComments, User, Op } = require("../db.js");
const router = Router();

/* Ruta para crear un tema */

router.post("/", async (req, res) => {
  const { userId, title, subtitle, body, image, category } = req.body;
  console.log(req.body);
  try {
    if (!userId || !title || !body || !image || !category) {
      return res.status(400).json({ msg: "Faltan campos requeridos." });
    }

    const foundPost = await Post.findOne({
      where: { title, subtitle, body, category },
    });
    if (foundPost)
      return res.status(400).json({ msg: "El post ingresado ya existe." });

    const newPost = await Post.create({
      userId,
      title,
      subtitle,
      body,
      image,
      category,
    });

    if (!newPost) return res.status(400);
    res.status(200).send("Publicación creada con éxito.");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "No se pudo crear post" });
  }
});

const getPosts = async (req, res) => {
  const { title, category } = req.query;

  let filters = {};
  if (category) {
    filters.category = category;
  }
  if (title) filters.title = { [Op.iLike]: `%${title}%` };

  return await Post.findAll({
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password", "username", "createdAt", "updatedAt"],
        },
      },
    ],
    where: Object.keys(filters).length ? filters : null,
  });
};

/* Ruta para obtener posts */

router.get("/", async (req, res) => {
  try {
    let dataPost = await getPosts(req, res);
    console.log(dataPost.length, "dataPOST");
    if (!dataPost.length)
      return res.status(404).send({ msg: "No se encontraron posts" });
    return res.status(200).send(dataPost);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Error intente de nuevo" });
  }
});

/* Ruta para obtener un post por id */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ msg: "No se recibió id." });
    }
    const post = await Post.findByPk(id, {
      attributes: {
        exclude: ["createdAt"],
      },
      include: [
        {
          model: PostComments,
          attributes: ["id", "comments", "likes"],
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "image"],
        },
      ],
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(400).send("Publicación no encontrada.");
  }
});

/* Ruta para obtener las publicaciones del admi*/
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).send({ msg: "No se recibió id." });
    }

    const blogs = await Post.findAll({
      where: { userId: id },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send(blogs);
  } catch (err) {
    res.status(404).send({ msg: "No hay publicaciones cargadas." });
  }
});

/* Ruta para eliminar un post */

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ msg: "No se recibió id." });
    }
    await Post.destroy({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).send("Publicación eliminada.");
  } catch (err) {
    res.status(400).send("No se logró eliminar.");
  }
});

/* Ruta para modificar un post */

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const { title, subtitle, body, image, category } = req.body;

    const foundPost = await Post.findOne({
      where: { title, subtitle, body, category },
    });
    if (foundPost)
      return res.status(400).json({ msg: "El post ingresado ya existe." });

    const postUpdate = await Post.update(
      {
        title: title,
        subtitle: subtitle,
        body: body,
        image: image,
        category: category,
      },
      {
        where: { id: id },
      }
    );

    postUpdate.length
      ? res.status(200).send("Publicación actualizada.")
      : res.status(404).send("No se logró eliminar.");
  }
});

module.exports = router;
