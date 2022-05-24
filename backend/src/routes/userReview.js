const { Router } = require("express");
const { UserReview, User } = require("../db.js");
const router = Router();

/* Ruta para crear/agregar UserReview */

router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { description, rating, ownerId } = req.body;
  console.log(userId)
  console.log(description)
  console.log(rating)
  console.log(ownerId)
  
  try{
    if(!description || !rating){
      return res.status(400).json({ msg: "Faltan campos requeridos."});
    }
    
    await UserReview.create({
      description: description,
      rating: rating,
      ownerId: ownerId,
      userId: parseInt(userId),
    });

    return res.status(200).send("Comentario creado correctamente.");

  } catch (err){
    return res.status(400).send({ msg: "Error intente de nuevo."});
  }
});

/* Ruta para obtener todas las UserReview. */

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try{
    const reviews = await UserReview.findAll({
      where: {
        userId: userId,
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
    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(400).send("Comentarios no encontrados.");
  }
});

/* Ruta para modificar UserReview */

router.put("/:userId/:id", async (req, res) => {
  const { userId, id } = req.params;
  const { description, rating } = req.body;

  try{
    const reviews = await UserReview.update(
      {
        description: description,
        rating: rating,
      },
      {
        where: {
          userId: userId,
          id: id,
        },
      }
    );

    return res.status(200).send("Comentario actualizado.");
  } catch(err){
    return res.status(400).send("No se pudo modificar.");
  }
});

/* Ruta para eliminar UserReview */

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try{
    if(!id){
      return res.status(400).send({ msg: "No se recibió el id." });
    }

    await UserReview.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).send("Review eliminado.");
  } catch (err) {
    return res.status(404).send("No se pudo eliminar.");
  }
});

module.exports = router;
