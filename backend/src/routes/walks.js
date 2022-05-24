const { Router } = require("express");
const router = Router();
const { User, Walk, Weekday, Reserve, Dog, UserReview, Op } = require("../db");
const { normalize } = require("../utils/location");
const { translateDay, translateShift } = require("../utils/translate");

const weekdaysMapped = (weekdays) => {
  return weekdays.map((x) => {
    const [day, shift] = x.split("-");

    return {
      day: day.toLowerCase(),
      shift: shift.toLowerCase(),
    };
  });
};

router.post("/", async (req, res) => {
  const {
    location,
    description,
    price,
    maxDogs,
    weekdays,
    userId,
    image,
    castrated,
  } = req.body;

  try {
    const walks = await Walk.findAll({
      where: { userId },

      include: [
        {
          model: Weekday,
          where: {
            day: {
              [Op.in]: weekdays.map((x) => x.split("-")[0].toLowerCase()),
            },
            shift: {
              [Op.in]: weekdays.map((x) => x.split("-")[1].toLowerCase()),
            },
          },
        },
      ],
    });

    if (walks.length) {
      const [first] = walks;
      const json = first.toJSON();

      return res.status(400).send({
        msg: `Ya existe un paseo para el ${translateDay(
          json.weekdays[0].day
        )} a la ${translateShift(json.weekdays[0].shift)}`,
      });
    }

    await Walk.create(
      {
        location: normalize(location),
        description,
        price,
        maxDogs,
        userId,
        weekdays: weekdaysMapped(weekdays),
        image,
        castrated,
        status: "active",
      },
      {
        include: [Weekday],
      }
    );

    return res.status(200).send({ msg: "Paseo creado correctamente." });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Bad request" });
  }
});

// recomendaciones de paseos cercanos en la provincia
const getWalksRecommended = async (req, res, province) => {
  return await Walk.findAll({
    where: {
      location: {
        [Op.iLike]: `%${province}%`,
      },
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "image"],
        include: [
          {
            model: UserReview,
            attributes: ["rating"],
          },
        ],
      },
      {
        model: Weekday,
        attributes: {
          exclude: ["walkId"],
        },
      },
      {
        model: Reserve,
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Dog,
            attributes: ["id", "name", "image"],
            exclude: ["createdAt", "updatedAt"],
          },
        ],
      },
    ],
  });
};

router.get("/", async (req, res) => {
  let { day, shift, location, castrated, province, price, order } = req.query;

  if (!order) {
    order = "ASC";
  }
  let filters = {};
  let filterWalks = {
    status: "active",
  };
  // /walks?shift=tuesday
  if (day) filters.day = day;
  if (shift)
    // /walks?day=afternoon
    filters.shift = shift;
  if (price) filterWalks.price = price;
  // /walks?castrated=true
  if (castrated) {
    if (castrated === "yes" || castrated === "no") {
      filterWalks.castrated = castrated;
    }
  }

  // /walks?location=maipu
  if (location) {
    let normalizeLocation = normalize(location);
    console.log(normalizeLocation);
    filterWalks.location = {
      [Op.iLike]: `%${normalizeLocation}%`,
    };
  }

  try {
    const walks = await Walk.findAll({
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      where: Object.keys(filterWalks).length ? filterWalks : null,
      order: [["price", order]],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "image"],
          include: [
            {
              model: UserReview,
              attributes: ["rating"],
            },
          ],
        },
        {
          model: Weekday,
          attributes: {
            exclude: ["walkId"],
          },
          where: Object.keys(filters).length ? filters : null,
        },
        {
          model: Reserve,
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Dog,
              attributes: ["id", "name", "image"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    const walksRecommended = await getWalksRecommended(req, res, province);

    if (!walks.length) return res.status(404).send({ msg: "Walks not found" });

    // return res.json({ walks });
    return res.json({ walks, walksRecommended });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Bad request" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(400).send({ msg: "Bad request." });

    const walk = await Walk.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "image", "email"],
        },
        {
          model: Weekday,
          attributes: {
            exclude: ["walkId"],
          },
        },
        {
          model: Reserve,
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Dog,
              attributes: ["id", "name", "image"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });
    if (!walk) return res.status(404).send({ msg: "El paseo no existe." });

    res.json(walk);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Error, por favor intente nuevamente." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ msg: "No se recibió id" });
    }

    await Walk.destroy({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).send("Paseo eliminado");
  } catch (err) {
    res.status(400).send(`No se logró eliminar`);
  }
});

// Ruta para obtener los paseos del paseador
router.get("/users/:id", async (req, res) => {
  let { day, shift, location, castrated, price, order } = req.query;
  const { id } = req.params;

  if (!id) return res.status(400).send({ msg: "No se recibió id" });

  if (!order) {
    order = "ASC";
  }
  let filters = {};
  let filterWalks = {
    status: "active",
    userId: id,
  };

  try {
    // /walks?shift=tuesday
    if (day) filters.day = day;
    if (shift)
      // /walks?day=afternoon
      filters.shift = shift;
    if (price) filterWalks.price = price;
    // /walks?castrated=true
    if (castrated) {
      if (castrated === "yes" || castrated === "no") {
        filterWalks.castrated = castrated;
      }
    }

    // /walks?location=maipu
    if (location) {
      filterWalks.location = {
        [Op.iLike]: `%${normalizeLocation}%`,
      };
    }

    const walks = await Walk.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: Object.keys(filterWalks).length ? filterWalks : null,
      order: [["price", order]],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "image"],
          include: [
            {
              model: UserReview,
              attributes: ["rating"],
            },
          ],
        },
        {
          model: Weekday,
          attributes: {
            exclude: ["walkId"],
          },
          where: Object.keys(filters).length ? filters : null,
        },
        {
          model: Reserve,
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Dog,
              attributes: ["id", "name", "image"],
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!walks.length)
      return res.status(404).send({ msg: "No hay paseos cargados" });

    return res.send(walks);
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Error, por favor intente nuevamente." });
  }
});

router.put("/inactive/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Walk.update(
      {
        status: "inactive",
      },
      {
        where: { id: id },
      }
    );

    res.send({ msg: "Paseo desactivado" });
  } catch (err) {
    return res.status(400).send({ msg: "No se pudo actualizar" });
  }
});

module.exports = router;
