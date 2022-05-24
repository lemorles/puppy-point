const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("dogReview", {
    description: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 5,
      },
    },
  });
};
