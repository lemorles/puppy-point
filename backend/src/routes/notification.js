const { Router } = require("express");
const { Notification, User } = require("../db.js");
const router = Router();

router.post("/new", async (req, res) => {
  const { userId, title, message } = req.body;
  console.log(req.body);
  try {
    if (!message || !userId || !title) {
      return res.status(404).json({ msg: "Faltan campos requeridos." });
    }

    await Notification.create({
      status: "active",
      title: title,
      message: message,
      userId: parseInt(userId),
    });

    return res.status(200).send("Notificación enviada correctamente");
  } catch (err) {
    return res.status(400).send({ msg: "Error intente de nuevo" });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const mensajes = await Notification.findAll({
      where: {
        userId: userId,
      },
    });
    return res.status(200).json(mensajes);
  } catch (err) {
    return res.status(400).send("Notificaciones no encontrados");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const notificacion = await Notification.update(
      {
        status: inactive,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).send("Notifiacion actualizado.");
  } catch (err) {
    return res.status(400).send("No se pudo modificar.");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.destroy({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).send("Notificacion eliminada");
  } catch (err) {
    res.status(400).send({ msg: "No se logró eliminar" });
  }
});

module.exports = router;
