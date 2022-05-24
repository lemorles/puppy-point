const { Router } = require("express");
const router = Router();
const { User, Reserve, Walk, Dog, Op } = require("../db");
const { sendEmail } = require("../utils/email");

var URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://puppypoint.vercel.app";

//POST NEW RESERVE
router.post("/newreserve", async (req, res) => {
  const { date, shift, userId, walkId, dogsId, walkerId, dogCounter } =
    req.body;

  console.log(req.body);
  try {
    const dogCount = dogsId.length;

    const walk = await Walk.findByPk(walkId);
    const { maxDogs } = walk;

    if (dogCount > maxDogs - dogCounter) {
      return res.status(400).json({
        msg: "La cantidad de perros seleccionados supera la disponibilidad",
      });
    }

    /*     if (dogCount > dogCounter) {
      return res.status(400).json({
        msg: "La cantidad de perros seleccionados supera la disponibilidad",
      });
    } */

    if (!userId || !date || !shift || !walkId || !dogsId || !walkerId) {
      console.log("Faltan campos requeridos.");
      return res.status(400).json({ msg: "Faltan campos requeridos." });
    }

    const reserves = await Reserve.findAll({
      where: {
        date,
        shift,
      },
      include: [
        {
          model: Dog,
          where: {
            id: { [Op.in]: dogsId },
          },
        },
      ],
    });

    if (reserves.length) {
      const [first] = reserves;

      let str = "";
      for (const x of first.dogs) {
        str = str + x.name + ", ";
      }

      return res.status(400).json({
        msg: `Ya existe una reserva para la fecha y turno para ${str.slice(
          0,
          -2
        )}.`,
      });
    }

    let newReserve = await Reserve.create(
      {
        status: "pending",
        date,
        shift,
        dogCount,
        userId,
        walkId,
        walkerId,
      },
      {
        include: [User, Walk],
      }
    );

    let dogs = await Dog.findAll({
      where: { id: dogsId },
    });

    newReserve.addDog(dogs);

    return res.status(200).send("Reserve created successfully");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ msg: "Error, por favor intente nuevamente." });
  }
});

//GET ALL RESERVES
router.get("/", async (req, res) => {
  try {
    const reserves = await Reserve.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: [
            "id",
            "userId",
            "location",
            "description",
            "maxDogs",
            "price",
          ],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Walks not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVE BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(400).send({ msg: "Bad request." });

    const reserve = await Reserve.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: [
            "id",
            "userId",
            "location",
            "description",
            "maxDogs",
            "image",
          ],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName", "image"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserve) return res.status(404).send({ msg: "La reserva no existe." });

    return res.status(200).send(reserve);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ msg: "Error, por favor intente nuevamente." });
  }
});

//DELETE RESERVE BY ID
router.delete("/:id/:userId", async (req, res) => {
  const { id, userId } = req.params;

  try {
    if (!id) {
      return res.status(400).send({ msg: "No se recibió id" });
    }

    await Reserve.destroy({
      where: {
        id: parseInt(id),
      },
    });

    try {
      const reserves = await Reserve.findAll({
        where: { userId: userId, status: "pending" },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"],
            exclude: ["createdAt", "updatedAt"],
          },
          {
            model: Dog,
            attributes: ["id", "name", "image"],
            exclude: ["createdAt", "updatedAt"],
          },
          {
            model: Walk,
            attributes: [
              "id",
              "userId",
              "location",
              "description",
              "maxDogs",
              "price",
            ],
            exclude: ["createdAt", "updatedAt"],
            include: [
              {
                model: User,
                attributes: ["firstName", "lastName"],
                exclude: ["createdAt", "updatedAt"],
              },
            ],
          },
        ],
      });

      return res.json(reserves);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ msg: "Bad request" });
    }
  } catch (err) {
    return res.status(400).send({ msg: "No se logró eliminar" });
  }
});

//GET RESERVES BY USER OWNER
router.get("/owner/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const reserves = await Reserve.findAll({
      where: { userId: userId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: ["id", "userId", "location", "description", "maxDogs"],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Reserves not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVES BY USER WALKER
router.get("/walker/", async (req, res) => {
  const { userId } = req.body;

  try {
    const reserves = await Reserve.findAll({
      where: { walkerId: userId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: ["id", "userId", "location", "description", "maxDogs"],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Reserves not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVES BY WALK
router.get("/walk/:walkId", async (req, res) => {
  const { walkId } = req.params;

  try {
    if (!walkId) return res.status(400).send({ msg: "Bad request." });

    const reserve = await Reserve.findAll({
      where: { walkId: walkId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: ["id", "userId", "location", "description", "maxDogs"],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserve)
      return res.status(404).send({ msg: "El paseo no posee reservas." });

    return res.json(reserve);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ msg: "Error, por favor intente nuevamente." });
  }
});

//UPDATE STATE OF RESERVE
router.put("/status/:reserveId", async (req, res) => {
  const { status } = req.body;
  const { reserveId } = req.params;
  try {
    Reserve.update(
      {
        status: status,
      },
      { where: { id: reserveId } }
    );

    const reserve = await Reserve.findByPk(reserveId);
    const user = await User.findByPk(reserve.userId);

    //"completed", "canceled"
    if (status === "canceled") {
      // email owner
      const context = {
        reserveId,
        fullName: user.fullName,
        link: `${URL}/miscompras`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Reserva cancelada",
        "reserveCanceledOwner",
        context
      );
      // email walker
      const context_ = {
        reserveId,
        fullName: user.fullName,
        link: `${URL}/ventas`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Reserva cancelada",
        "reserveCanceledWalker",
        context_
      );
    }

    if (status === "completed") {
      // email owner
      const context = {
        reserveId,
        fullName: user.fullName,
        link: `${URL}/miscompras`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Reserva completada",
        "reserveCompletedOwner",
        context
      );
      // email walker
      const context_ = {
        reserveId,
        fullName: user.fullName,
        link: `${URL}/ventas`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Reserva completada",
        "reserveCompletedWalker",
        context_
      );
    }

    return res.status(200).send({ msg: "Reserve update successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//UPDATE ALL PENDINGS INTO ACCEPTED
router.put("/payed/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    Reserve.update(
      {
        status: "accepted",
      },
      { where: { userId: userId, status: "pending" } }
    );

    try {
      const reserves = await Reserve.findAll({
        where: { userId: userId, status: "accepted" },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"],
            exclude: ["createdAt", "updatedAt"],
          },
          {
            model: Dog,
            attributes: ["id", "name", "image"],
            exclude: ["createdAt", "updatedAt"],
          },
          {
            model: Walk,
            attributes: ["id", "userId", "location", "description", "maxDogs"],
            exclude: ["createdAt", "updatedAt"],
            include: [
              {
                model: User,
                attributes: ["firstName", "lastName"],
                exclude: ["createdAt", "updatedAt"],
              },
            ],
          },
        ],
      });

      if (!reserves.length)
        return res.status(404).send({ msg: "Reserves not found" });

      return res.json(reserves);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ msg: "Bad request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET ALL RESERVES FOR SPECIFIC DATE AND SHIFT
router.get("/specificwalk/", async (req, res) => {
  const { date, shift, walkId } = req.body;

  try {
    const reserve = await Reserve.findAll({
      where: { date: date, shift: shift, walkId: walkId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: [
            "id",
            "userId",
            "location",
            "description",
            "maxDogs",
            "price",
          ],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserve.length)
      return res.status(404).send({ msg: "Walks not found" });

    //AMOUNT OF DOGS
    var amountOfDogs = reserve.reduce((sum, value) => sum + value.dogCount, 0);
    console.log(amountOfDogs);

    return res.json(reserve, amountOfDogs);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//COUNT DOGS IN RESERVE
router.get("/specificwalk/dogs/:date/:shift/:walkId", async (req, res) => {
  const { date, shift, walkId } = req.params;

  try {
    const reserve = await Reserve.findAll({
      where: {
        date: date,
        shift: shift,
        walkId: walkId,
        status: {
          [sequelize.Op.not]: "canceled",
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: ["id", "userId", "location", "description", "maxDogs"],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    //AMOUNT OF DOGS
    var amountOfDogs = reserve.reduce((sum, value) => sum + value.dogCount, 0);

    return res.json(amountOfDogs);
  } catch (err) {
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVES BY WALKER
router.get("/walker/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reserves = await Reserve.findAll({
      where: {
        walkerId: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: [
            "id",
            "userId",
            "location",
            "description",
            "maxDogs",
            "price",
          ],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Reserves not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVES BY WALKER PENDING
router.get("/walker/pending/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reserves = await Reserve.findAll({
      where: { walkerId: id, status: "pending" },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: ["id", "userId", "location", "description", "maxDogs"],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Reserves not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVES BY WALKER COMPLETED
router.get("/walker/accepted/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reserves = await Reserve.findAll({
      where: { walkerId: id, status: "completed" },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: ["id", "userId", "location", "description", "maxDogs"],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Reserves not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVES BY OWNER PENDING
router.get("/owner/pending/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reserves = await Reserve.findAll({
      where: { userId: id, status: "pending" },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: [
            "id",
            "userId",
            "location",
            "description",
            "maxDogs",
            "price",
          ],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Reserves not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVES BY OWNER COMPLETED
router.get("/owner/completed/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reserves = await Reserve.findAll({
      where: { userId: id, status: "pending" },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: ["id", "userId", "location", "description", "maxDogs"],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Reserves not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

//GET RESERVES BY OWNER ACCEPTED
router.get("/owner/accepted/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const reserves = await Reserve.findAll({
      where: { userId: id, status: "accepted" },
      order: [["date", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Dog,
          attributes: ["id", "name", "image"],
          exclude: ["createdAt", "updatedAt"],
        },
        {
          model: Walk,
          attributes: ["id", "userId", "location", "description", "maxDogs"],
          exclude: ["createdAt", "updatedAt"],
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!reserves.length)
      return res.status(404).send({ msg: "Reserves not found" });

    return res.json(reserves);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Bad request" });
  }
});

module.exports = router;
