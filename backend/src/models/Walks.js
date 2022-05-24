const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("walk", {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
    },
    // startTime: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   required: true,
    //   trim: true,
    // },
    // endTime: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   required: true,
    //   trim: true,
    // },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      required: true,
      trim: true,
    },
    maxDogs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      trim: true,
    },
    castrated: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: false,
      required: true,
      trim: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      required: true,
      trim: true,
    },
  });
};
