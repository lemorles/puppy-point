require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/proyectoGrupal`,
        { logging: false, native: false }
      );
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  User,
  Dog,
  Breed,
  UserReview,
  DogReview,
  Walk,
  Weekday,
  Post,
  Reserve,
  PostComments,
  Token,
  Order,
  Chat,
  Notification,
  Help,
} = sequelize.models;

Breed.hasMany(Dog);
Dog.belongsTo(Breed);

User.hasMany(Dog);
Dog.belongsTo(User);

Dog.hasMany(DogReview);
DogReview.belongsTo(Dog);

// relatioships Walker-Client-UserReview
User.hasMany(UserReview);
UserReview.belongsTo(User);

User.hasMany(UserReview, { foreignKey: "id" });
UserReview.belongsTo(User, { foreignKey: "ownerId" });

// relationships Walk-User-Weekday
User.hasMany(Walk);
Walk.belongsTo(User);

Walk.hasMany(Weekday);
Weekday.belongsTo(Walk);

// relationships Post-User-Comments
User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(PostComments);
PostComments.belongsTo(User);

Post.hasMany(PostComments);
PostComments.belongsTo(Post);

// relationships Dog-Reserve-Walk
Dog.belongsToMany(Reserve, { through: "Dog_Reserve" });
Reserve.belongsToMany(Dog, { through: "Dog_Reserve" });

User.hasMany(Reserve);
Reserve.belongsTo(User);

Reserve.belongsTo(Walk);
Walk.hasMany(Reserve);

// relationships Token-User
User.hasMany(Token);
Token.belongsTo(User);

// relationships User-Order-Reserve
User.hasMany(Order);
Order.belongsTo(User);

Reserve.belongsToMany(Order, { through: "Order_Reserve" });
Order.belongsToMany(Reserve, { through: "Order_Reserve" });

// relationships User-Notification
User.hasMany(Notification);
Notification.belongsTo(User);

// relationships Chat-User-Reserve

User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(Chat, { foreignKey: "id" });
Chat.belongsTo(User, { foreignKey: "sender" });

Reserve.hasMany(Chat);
Chat.belongsTo(Reserve);

// relatioships User-Helping
User.hasMany(Help);
Help.belongsTo(User);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
