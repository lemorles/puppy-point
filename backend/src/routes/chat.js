const { Router } = require("express");
const { Chat, User } = require("../db.js");
const router = Router();

/* Ruta para crear mensaje */

router.post("/:reserveId", async (req, res) => {
  const { reserveId } = req.params;
  const { message, userId, sender } = req.body;

  try {
    if (!message || !userId || !sender || !reserveId) {
      return res.status(404).json({ msg: "Faltan campos requeridos." });
    }

    await Chat.create({
      message: message,
      userId: parseInt(userId),
      sender: parseInt(sender),
      reserveId: parseInt(reserveId),
    });

    return res.status(200).send("Mensaje enviado correctamente");
  } catch (err) {
    return res.status(400).send({ msg: "Error intente de nuevo" });
  }
});

/* Ruta para obtener todas los mensajes. */

router.get("/:reserveId", async (req, res) => {
  const { reserveId } = req.params;
  try {
    const mensajes = await Chat.findAll({
      where: {
        reserveId: reserveId,
      },
    });
    return res.status(200).json(mensajes);
  } catch (err) {
    return res.status(400).send("Comentarios no encontrados");
  }
});

module.exports = router;
