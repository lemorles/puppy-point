require("dotenv").config();
const { Router } = require("express");
const { User, Token, Op, Notification } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/email");

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://puppypoint.vercel.app";

router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    birthdate,
    email,
    password,
    role,
    gender,
    phone,
  } = req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !birthdate ||
      !email ||
      !password ||
      !role ||
      !gender ||
      !phone
    ) {
      return res.status(400).json({ msg: "Faltan campos requeridos." });
    }

    const foundEmail = await User.findOne({ where: { email } });
    if (foundEmail)
      return res.status(400).json({ msg: "El correo ingresado ya existe." });

    const passwordHash = await bcrypt.hash(password, 10);

    const fixName = firstName.concat(" ", lastName);

    const user = await User.create({
      firstName,
      lastName,
      username: email,
      birthdate,
      email,
      password: passwordHash,
      gender,
      phone,
      role,
      fullName: fixName,
      status: "active",
    });

    if (!user)
      return res
        .status(500)
        .json({ msg: "Error, por favor intente nuevamente." });

    // const { password, ...rest } = user.dataValues;
    // const userToken = { id: user.id, email: user.email, role: user.role };
    delete user.dataValues.password;
    const token = jwt.sign(user.dataValues, process.env.JWT_SECRET);

    res.json({ token, user });

    await Notification.create({
      status: "active",
      title: "BIENVENIDO",
      message:
        "Te damos la bienvenida a un mundo de grandes oportunidades!   En Puppy Point estamos felices de tenerte entre nosotros.",
      userId: parseInt(user.id),
    });

    const context = {
      fullName: `${user.fullName}`,
    };

    await sendEmail(email, "Bienvenido/a a Puppy Point", "welcome", context);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error, por favor intente nuevamente." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ msg: "Faltan campos requeridos." });

    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ["username", "createdAt", "updatedAt"],
      },
    });

    if (!user)
      return res
        .status(400)
        .json({ msg: "El email y la contraseña no son validas." });

    if (user.status === "locked") {
      return res.status(400).json({
        msg: "Usuario bloqueado. Contactarse a puppypointhenry@gmail.com",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare)
      return res
        .status(400)
        .json({ msg: "El email y la contraseña no son validas." });

    user.dataValues.fullName = `${user.firstName} ${user.lastName}`;
    delete user.dataValues.password;

    const token = jwt.sign(user.dataValues, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ token, user: user.dataValues });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error, por favor intente nuevamente." });
  }
});

router.post("/login-with-google", async (req, res) => {
  const { firstName, lastName, email, googleId, image } = req.body;

  if (!firstName || !lastName || !email || !googleId || !image)
    return res.status(400).send({ msg: "Faltan campos requeridos." });

  try {
    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ["password", "username", "createdAt", "updatedAt"],
      },
    });

    if (user && user.status === "locked") {
      return res.status(400).json({
        msg: "Usuario bloqueado. Contactarse a puppypointhenry@gmail.com",
      });
    }

    if (user) {
      const token = jwt.sign(user.dataValues, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ token, user });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      googleId,
      image,
      fullName: `${firstName} ${lastName}`,
      status: "inactive",
      // default role is owner
    });

    if (!newUser)
      return res.status(400).send({ msg: "No se pudo crear el usuario." });

    const { password, ...rest } = newUser.dataValues;

    const token = jwt.sign(rest, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: rest });

    await Notification.create({
      status: "active",
      title: "BIENVENIDO",
      message:
        "Te damos la bienvenida a un mundo de grandes oportunidades!   En Puppy Point estamos felices de tenerte entre nosotros.",
      userId: parseInt(newUser.id),
    });

    const context = {
      fullName: `${newUser.fullName}`,
    };

    await sendEmail(email, "Bienvenido/a a Puppy Point", "welcome", context);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Error, por favor intente nuevamente." });
  }
});

const getUsers = async (req, res) => {
  const { fullName, role, order = "ASC" } = req.query;

  let filters = {};
  if (fullName) {
    filters.fullName = { [Op.iLike]: `%${fullName}%` };
  }
  if (role) {
    filters.role = role;
  }

  const users = await User.findAll({
    attributes: {
      exclude: ["password", "username", "createdAt", "updatedAt"],
    },
    where: Object.keys(filters).length ? filters : null,
    order: [["fullName", order]],
  });

  return users;
};

router.get("/", async (req, res) => {
  try {
    const users = await getUsers(req, res);
    if (!users.length) {
      return res.status(404).send({ msg: "No se encontraron usuarios." });
    }
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ msg: "Error, por favor intente nuevamente." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password", "username", "createdAt", "updatedAt"],
      },
    });

    if (!user) return res.status(404).send({ msg: "El usuario no existe" });

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error, por favor intente nuevamente." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    birthdate,
    email,
    role,
    gender,
    phone,
    image,
    password,
  } = req.body;

  try {
    if (
      !id ||
      !firstName ||
      !lastName ||
      !birthdate ||
      !email ||
      !role ||
      !gender ||
      !phone ||
      !image
    ) {
      return res.status(400).send({ msg: "Faltan campos requeridos." });
    }

    let userEdit = {};
    if (password) {
      userEdit = {
        ...userEdit,
        id,
        firstName,
        lastName,
        birthdate,
        email,
        gender,
        phone,
        role,
        image,
        fullName: `${firstName} ${lastName}`,
        status: "active",
        password: await bcrypt.hash(password, 10),
      };
    } else {
      userEdit = {
        ...userEdit,
        id,
        firstName,
        lastName,
        birthdate,
        email,
        gender,
        phone,
        role,
        image,
        fullName: `${firstName} ${lastName}`,
        status: "active",
      };
    }

    await User.update(userEdit, { where: { id } });

    const token = jwt.sign(userEdit, process.env.JWT_SECRET);

    return res.json({ token, user: userEdit });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error, por favor intente nuevamente." });
  }
});

router.put("/password/:id", async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  try {
    if (!password || !newPassword) {
      return res.status(400).send({ msg: "Faltan campos requeridos." });
    }

    if (password === newPassword) {
      return res
        .status(400)
        .send({ msg: "Las contraseñas no pueden ser iguales." });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).send({ msg: "El usuario no existe." });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare)
      return res
        .status(400)
        .send({ msg: "La contraseña anterior ingresada no es valida." });

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await User.update({ password: passwordHash }, { where: { id } });

    return res
      .status(200)
      .json({ msg: "Contraseña actualizada correctamente." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error, por favor intente nuevamente." });
  }
});

router.put("/role/:id", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    if (!role) {
      res.status(400).send({ msg: "Faltan campos requeridos." });
      return;
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ msg: "El usuario no existe." });
    }

    await User.update(
      {
        role: role,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({ msg: "Usuario actualizado correctamente." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error, por favor intente nuevamente." });
  }
});

// send email with password reset link
router.post("/password/reset", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send({ msg: "El usuario no existe." });

    const dataToken = { id: user.id, email: user.email, role: user.role };

    let [token, created] = await Token.findOrCreate({
      where: {
        token: jwt.sign(dataToken, process.env.JWT_SECRET),
        userId: user.id,
      },
    });

    if (!token)
      return res.status(500).send({ msg: "Error al enviar el correo." });

    if (!created) {
      token = await Token.update(
        { token: jwt.sign(dataToken, process.env.JWT_SECRET) },
        {
          where: {
            userId: user.id,
          },
        }
      );
    }

    const context = {
      fullName: `${user.firstName} ${user.lastName}`,
      link: `${URL}/password/reset/${token.token}`,
    };

    await sendEmail(
      user.email,
      "Puppy Point - Recuperar contraseña",
      "passwordReset",
      context
    );

    return res.send({
      msg: "Se ha enviado un correo para recuperar tu contraseña.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error, por favor intente nuevamente." });
  }
});

// reset password with token
router.post("/password/reset/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!token)
      return res
        .status(400)
        .send({ msg: "No se puede restablecer la contraseña." });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user)
      return res.status(400).send({ msg: "Enlace no valido o expirado." });

    const tokenFound = await Token.findOne({
      where: {
        token,
      },
    });

    if (!tokenFound)
      return res.status(400).send({ msg: "Enlace no valido o expirado." });

    await User.update(
      { password: await bcrypt.hash(password, 10) },
      {
        where: {
          id: user.id,
        },
      }
    );

    await Token.destroy({
      where: { userId: user.id },
    });

    return res.send({ msg: "Contraseña restablecida correctamente." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ msg: "Error, por favor intente nuevamente." });
  }
});

router.put("/status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await User.update(
      {
        status,
      },
      {
        where: { id },
      }
    );

    res.send({ msg: "Usuario actualizada con éxito" });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "No se pudo actualizar" });
  }
});

router.post("/password/force", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send({ msg: "El usuario no existe." });

    const newPassword = "Puppy1234";
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await User.update(
      { password: passwordHash },
      {
        where: {
          email,
        },
      }
    );

    const context = {
      fullName: `${user.fullName}`,
      link: `${URL}/login`,
      newPassword,
    };

    await sendEmail(
      user.email,
      "Puppy Point - Contraseña restablecida",
      "newPassword",
      context
    );

    return res.send({
      msg: "Se ha enviado un correo la contraseña restablecida.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error, por favor intente nuevamente." });
  }
});

module.exports = router;
