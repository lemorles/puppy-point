const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("help", {
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            required: true,
        },
        status: {
            type: DataTypes.ENUM("open", "close"),
            allowNull: false,
            required: true,
        },
    });
};

