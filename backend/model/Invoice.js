const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");
const Product = require("./Products");
const Customer = require("./Customers");
const Stock = require("./Stock");

const Invoice = sequelize.define(
    "Invoice",
    {
        invoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        invoiceNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        invoiceDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "invoice",
        timestamps: false,
    }
);
module.exports = Invoice;
