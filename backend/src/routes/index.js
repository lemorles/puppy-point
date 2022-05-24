const { Router } = require("express");

const users = require("./user.js");
const dogs = require("./dog.js");
const dogreviews = require("./dogReview.js");
const postComment = require("./postComment.js");
const userreviews = require("./userReview.js");
const walks = require("./walks.js");
const post = require("./post.js");
const location = require("./location.js");
const reserve = require("./reserve.js");
const order = require("./order.js");
const breed = require("./breed.js");
const notification = require("./notification.js");
const chat = require("./chat.js");
const help = require("./help.js");

const router = Router();

router.use("/users", users);
router.use("/dogs", dogs);
router.use("/review/dog", dogreviews);
router.use("/review/user", userreviews);
router.use("/walks", walks);
router.use("/posts", post);
router.use("/comments", postComment);
router.use("/locations", location);
router.use("/reserve", reserve);
router.use("/order", order);
router.use("/breeds", breed);
router.use("/notification", notification);
router.use("/chat", chat);
router.use("/help", help);

module.exports = router;
