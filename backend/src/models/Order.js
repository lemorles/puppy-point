const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    status: {
      type: DataTypes.STRING,
    },
    payment_id: {
      type: DataTypes.INTEGER,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
    },
  });
};
