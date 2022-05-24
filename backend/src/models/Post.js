const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    subtitle: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    category: {
      type: DataTypes.ENUM("services", "tipsCare", "updates", "random"),
      allowNull: false,
      required: true,
    },
  });
};
