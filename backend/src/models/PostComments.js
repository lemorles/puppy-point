const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("postComments", {
      comments: {
          type: DataTypes.TEXT,
      },
      likes: {
          type: DataTypes.INTEGER,
      },
  });
};