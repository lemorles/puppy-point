const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "weekday",
    {
      day: {
        type: DataTypes.ENUM(
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday"
        ),
        allowNull: false,
        required: true,
        trim: true,
      },
      shift: {
        type: DataTypes.ENUM("morning", "afternoon", "evening"),
        allowNull: false,
        required: true,
      },
      // morning: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   required: true,
      // },
      // afternoon: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   required: true,
      // },
      // evening: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   required: true,
      // },
    },
    {
      timestamps: false,
    }
  );
};
