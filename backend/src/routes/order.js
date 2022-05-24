const { Router } = require("express");
const { Order, User, Reserve, Walk, Op, Notification } = require("../db.js");
const router = Router();
const PROD_ACCESS_TOKEN = process.env.PROD_ACCESS_TOKEN;
const { sendEmail } = require("../utils/email.js");
var mercadopago = require("mercadopago");

var URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://puppypoint.vercel.app";

mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN,
});

router.post("/mercadopago/", async (req, res) => {
  const { reserves, user, totalAmount } = req.body;
  try {
    let newOrder = await Order.create(
      {
        userId: user.id,
        totalAmount,
        status: "pending",
        reserves: reserves,
      },
      {
        include: [User],
      }
    );

    let reserve = await Reserve.findAll({
      where: { id: reserves },
    });

    newOrder.addReserve(reserve);

    let preference = {
      items: [
        {
          title: "PuppyPoint",
          quantity: 1,
          currency_id: "ARS",
          unit_price: parseInt(totalAmount),
        },
      ],
      back_urls: {
        success: `${URL}/checkout`,
        failure: `${URL}/checkout`,
        pending: `${URL}/checkout`,
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    const link = response.body.init_point;
    const orderId = newOrder.id;
    return res.send({ link, orderId });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Error" });
  }
});

router.put("/", async (req, res) => {
  const { orderId, payment_id, status, user } = req.body;
  try {
    const orderUpdate = await Order.update(
      {
        status: status,
        payment_id: payment_id,
      },
      {
        where: { id: orderId },
      }
    );

    // busco info de la orden
    const order = await Order.findByPk(orderId);

    if (status === "approved") {
      Reserve.update(
        {
          status: "accepted",
        },
        { where: { userId: user.id, status: "pending" } }
      );

      // owner
      // enviar correo con la confirmacion de la compra
      const context = {
        fullName: user.fullName,
        total: order.totalAmount,
        link: `${URL}/miscompras`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Pago confirmado",
        "orderConfirm",
        context
      );

      await Notification.create({
        status: "active",
        title: "NUEVA COMPRA",
        message:
          "El pago de su compra fue confirmado. Puede ver el detalle desde MIS COMPRAS",
        userId: parseInt(user.id),
      });

      // walker
      const context_ = {
        fullName: user.fullName,
        total: order.totalAmount,
        link: `${URL}/miscompras`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Pago confirmado",
        "orderConfirm",
        context_
      );

      return res.status(200).send({
        title: "Pago aprovado",
        msg: "El pago fue aprovado",
        status: "success",
      });
    }

    if (status === "rejected") {
      // enviar el correo con el rechazo de la compra
      const context = {
        fullName: user.fullName,
        link: `${URL}/miscompras`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Pago rechazado",
        "orderReject",
        context
      );

      await Notification.create({
        status: "active",
        title: "NUEVA COMPRA",
        message: "El pago de su compra fue rechazado.",
        userId: parseInt(user.id),
      });

      return res.status(200).send({
        title: "Pago rechazado",
        msg: "El pago fue rechazado. Intente nuevamente",
        status: "error",
      });
    }

    if (status === "pending") {
      // enviar el correo con cuando la compra esta pendiente
      const context = {
        fullName: user.fullName,
        link: `${URL}/miscompras`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Pago pendiente",
        "orderPending",
        context
      );

      await Notification.create({
        status: "active",
        title: "NUEVA COMPRA",
        message:
          "El pago de su compra esta pendiente. Los items de su carrito permaneceran hasta que se reciba el pago",
        userId: parseInt(user.id),
      });

      return res.status(200).send({
        title: "Pago pendiente",
        msg: "El pago no fue registado en caso de error contactarse con PuppyPoint",
        status: "info",
      });
    }

    if (status === "in_process") {
      // enviar el correo con cuando la compra esta pendiente
      const context = {
        fullName: user.fullName,
        link: `${URL}/miscompras`,
      };

      await sendEmail(
        user.email,
        "Puppy Point - Pago pendiente",
        "orderPending",
        context
      );

      await Notification.create({
        status: "active",
        title: "NUEVA COMPRA",
        message:
          "El pago de su compra esta pendiente. Los items de su carrito permaneceran hasta que se reciba el pago",
        userId: parseInt(user.id),
      });

      return res.status(200).send({
        title: "Pago pendiente",
        msg: "El pago no fue registado en caso de error contactarse con PuppyPoint",
        status: "info",
      });
    }

    if (!orderUpdate.length) {
      return res
        .status(404)
        .send("No se logró actualizar el estado de la orden");
    }

    return res.status(200).send("Estado de la orden actualizada correctamente");
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Error" });
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  if (!id) return res.status(400).send({ msg: "No se recibió id" });

  let filters = {
    userId: id,
  };

  try {
    if (status) filters.status = status;

    const orders = await Order.findAll({
      where: Object.keys(filters).length ? filters : null,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "fullName"],
        },
        {
          model: Reserve,
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Walk,
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
    });

    if (!orders.length)
      return res.status(404).send({ msg: "No hay ordenes cargadas." });
    return res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "No hay ordenes cargadas." });
  }
});

router.get("/", async (req, res) => {
  const { status, fullName } = req.query;

  let filters = {};
  let filtersUser = {};

  try {
    if (status) filters.status = status;
    if (fullName) filtersUser.fullName = { [Op.iLike]: `%${fullName}%` };

    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "fullName"],
          where: Object.keys(filtersUser).length ? filtersUser : null,
        },
        {
          model: Reserve,
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Walk,
              exclude: ["createdAt", "updatedAt"],
            },
          ],
        },
      ],
      where: Object.keys(filters).length ? filters : null,
    });

    if (!orders.length)
      return res.status(404).send({ msg: "No hay ordenes cargadas." });

    return res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ msg: "No se recibió id." });
    }
    await Order.destroy({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).send("Orden eliminada.");
  } catch (err) {
    console.log(err);
    return res.status(400).send("No se logró eliminar.");
  }
});

module.exports = router;
