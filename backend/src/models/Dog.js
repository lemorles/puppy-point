const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("dog", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    size: {
      type: DataTypes.ENUM("small", "medium", "large", "giant"),
      allowNull: false,
      required: true,
    },
    gender: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,
      required: true,
    },
    castrated: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
};
