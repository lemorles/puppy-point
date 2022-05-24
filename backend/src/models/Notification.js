const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("notification", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      required: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
      required: false,
    },
  });
};
