const { DataTypes } = require("sequelize");
const { User } = require("../models/User");

module.exports = (sequelize) => {
  sequelize.define("userReview", {
    description: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL,
      defaultValue: 5,
      validate: {
        min: 0,
        max: 5,
      },
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    }
  });
};
