const { DataTypes } = require("sequelize");
const { User } = require("../models/User");

module.exports = (sequelize) => {
  sequelize.define("chat", {
    message: {
      type: DataTypes.STRING,
    },
    sender: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  });
};
