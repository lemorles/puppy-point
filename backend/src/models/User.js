const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      required: true,
      trim: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      required: true,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      unique: true,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: true,
      required: true,
      trim: true,
    },
    gender: {
      type: DataTypes.ENUM("F", "M"),
      allowNull: true,
      required: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      required: true,
      trim: true,
    },
    role: {
      type: DataTypes.ENUM("owner", "walker", "admin"),
      allowNull: false,
      required: true,
      trim: true,
      defaultValue: "owner",
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      required: false,
      trim: true,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png",
    },
    fullName: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "locked"),
      allowNull: false,
      required: true,
      trim: true,
    },
  });
};
