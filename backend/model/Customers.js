const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Customer = sequelize.define(
    "Customer",
    {
        cusId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cusName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cusAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cusPhone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "customer",
        timestamps: false,
    }
);

module.exports = Customer;
