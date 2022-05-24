const { Router } = require("express");
const { Dog, Breed, Op, User } = require("../db.js");
const router = Router();

const getDogs = async (req, res) => {
  const { gender, size, breed } = req.query;

  let filters = {};
  let filtersBreed = {};
  if (gender) {
    filters.gender = gender;
  }
  if (size) {
    filters.size = size;
  }
  if (breed) {
    filtersBreed.name = { [Op.iLike]: `%${breed}%` };
  }

  return await Dog.findAll({
    include: [
      {
        model: Breed,
        where: Object.keys(filtersBreed).length ? filtersBreed : null,
      },
    ],

    attributes: {
      exclude: ["userId", "createdAt", "updatedAt"],
    },
    where: Object.keys(filters).length ? filters : null,
  });
};

/* Ruta para obtener Dogs */
router.get("/", async (req, res) => {
  try {
    const dogs = await getDogs(req, res);
    return res.status(200).send(dogs);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

/* Ruta para obtener Dog por id */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send({ msg: "No se recibió id" });

  const dog = await Dog.findByPk(id, {
    include: [
      { model: User },
      {
        model: Breed,
        attributes: ["id", "name"],
      },
    ],
  });

  if (!dog) {
    return res.status(404).send("Mascota no encontrada");
  }

  res.status(200).json(dog);
});

// Ruta para obtener los perros del owner
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send({ msg: "No se recibió id" });

  try {
    const { gender, size, breed } = req.query;

    let filters = {
      userId: id,
    };
    let filtersBreed = {};
    if (gender) {
      filters.gender = gender;
    }
    if (size) {
      filters.size = size;
    }
    if (breed) {
      filtersBreed.name = { [Op.iLike]: `%${breed}%` };
    }

    const dogs = await Dog.findAll({
      where: Object.keys(filters).length ? filters : null,
      include: [
        {
          model: Breed,
          where: Object.keys(filtersBreed).length ? filtersBreed : null,
        },
      ],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });

    if (!dogs.length) return res.status(404).send({ msg: "No hay mascotas." });

    return res.send(dogs);
  } catch (err) {
    console.log(err);

    return res.status(400).send({ msg: "Error al obtener mascotas" });
  }
});

/* Ruta para crear nuevo Dog */
router.post("/", async (req, res) => {
  const { name, size, gender, breed, image, userId, castrated } = req.body;

  try {
    if (!name || !size || !gender || !breed || !userId || !castrated) {
      return res.status(400).send({ msg: "Faltan campos requeridos." });
    }

    const breedFound = await Breed.findOne({
      where: {
        name: breed,
      },
    });
    if (!breedFound)
      return res.status(400).send({ msg: `No existe la raza ${breed}.` });

    const foundDog = await Dog.findOne({
      where: {
        name: { [Op.iLike]: `%${name}%` },
        userId: userId,
        breedId: breedFound.id,
      },
    });
    if (foundDog)
      return res
        .status(400)
        .json({ msg: "La mascota ingresado que ya existe." });

    const dogCreated = await Dog.create({
      name,
      size,
      gender,
      breedId: breedFound.id,
      image: image
        ? image
        : "https://i.pinimg.com/564x/c7/d8/1f/c7d81f201e1149c9c1879e5839ed28ea.jpg",
      userId,
      castrated,
    });

    if (!dogCreated)
      return res.status(400).send({ msg: "La mascota no se pudo guardar." });

    res.status(200).send("Mascota creada con éxito.");
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "La mascota no se pudo guardar." });
  }
});

/* Ruta para eliminar Dog */

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ msg: "No se recibió id" });
    }

    await Dog.destroy({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).send("Mascota eliminada");
  } catch (err) {
    res.status(400).send({ msg: "No se logró eliminar" });
  }
});

/* Ruta para modificar Dog */

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const { name, size, image, gender, breed, castrated } = req.body;
    const breedFound = await Breed.findOne({
      where: {
        name: breed,
      },
    });
    if (!breedFound)
      return res.status(400).send({ msg: "No se pudo actualizar" });
    let dogUpdate = await Dog.update(
      {
        name: name,
        size: size,
        image: image,
        gender: gender,
        breed: breedFound.name,
        castrated: castrated,
      },

      {
        where: { id },
      }
    );

    dogUpdate.length
      ? res.status(200).send("Mascota actualizada con éxito")
      : res.status(404).send(`No se pudo actualizar`);
  }
});

module.exports = router;
