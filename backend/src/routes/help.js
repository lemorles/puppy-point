const { Router } = require("express");
const { Help, User, Notification } = require("../db.js");
const router = Router();

router.post("/", async (req, res) => {
  const { userId, subject, description, status } = req.body;

  try {
    if (!userId || !subject || !description) {
      return res.status(400).json({ msg: "Faltan campos requeridos." });
    }

    const newHelp = await Help.create({
      userId,
      subject,
      description,
      status,
    });

    await Notification.create({
      status: "active",
      title: "Nuevo mensaje",
      message: "Tienes un nuevo mensaje en contacto",
      userId: parseInt(1),
    });

    res.status(200).send("Mensaje creado con éxito.");
  } catch (error) {
    return res.status(404).json({ msg: "No se pudo crear el mensaje." });
  }
});

const getHelps = async (req, res) => {
  return await Help.findAll({
    include: [
      {
        model: User,
        attributes: {
          exclude: [
            "password",
            "username",
            "createdAt",
            "updatedAt",
            "bithdate",
            "gender",
          ],
        },
      },
    ],
  });
};
router.get("/", async (req, res) => {
  try {
    let dataHelps = await getHelps();
    if (!dataHelps.length) {
      return res.status(404).send({ msg: "No se encontraron mensajes." });
    }
    return res.status(200).send(dataHelps);
  } catch (error) {
    return res.status(400).send({ msg: "Error intente de nuevo." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).send({ msg: "No se recibió id." });
    }

    await Help.destroy({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).send({ msg: "Mensaje eliminado." });
  } catch (error) {
    res.status(404).send({ msg: "No se pudo eliminar." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send({ msg: "No se recibió id." });
    }
    const helpById = await Help.findByPk(id, {
      attributes: {
        exclude: ["createdAt"],
      },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "phone",
            "image",
          ],
        },
      ],
    });
    return res.status(200).json(helpById);
  } catch (err) {
    return res.status(404).send({ msg: "Mensaje no encontrado." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const { status } = req.body;

    const foundHelp = await Help.findOne({
      where: {
        id: id,
      },
    });
    if (!foundHelp) {
      return res.status(400).json({ msg: "No se pudo actualizar." });
    }

    let helpUpdate = await Help.update(
      {
        status: status,
      },
      {
        where: { id },
      }
    );

    helpUpdate.length
      ? res.status(200).send({ msg: "Ayuda actualizada con éxito" })
      : res.status(404).send({ msg: "No se pudo actualizar" });
  }
});

module.exports = router;
