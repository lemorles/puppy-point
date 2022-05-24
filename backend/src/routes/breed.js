const { Router } = require("express");
const { Breed } = require("../db.js");

const router = Router();

const getBreeds = async () => {
  return await Breed.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

router.get("/", async (req, res) => {
  try {
    const breeds = await getBreeds();
    if (!breeds.length)
      return res.status(404).send({ msg: "No se encontraron razas" });
    res.status(200).send(breeds);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
