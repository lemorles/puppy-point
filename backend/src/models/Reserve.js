const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("reserve", {
    status: {
      type: DataTypes.ENUM("pending", "accepted", "completed", "canceled"),
      allowNull: false,
      required: true,
      defaultValue: "pending",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      required: true,
    },
    shift: {
      type: DataTypes.ENUM("morning", "afternoon", "evening"),
      allowNull: false,
      required: true,
    },
    dogCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    walkerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
  });
};
