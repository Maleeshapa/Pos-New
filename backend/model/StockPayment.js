const Stock = require("./Stock");
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const StockPayment = sequelize.define(
    "StockPayment",
    {
        stockPaymentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cashAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        chequeAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        due: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        vat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stockQty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // stockId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Stock,
        //         key: "stockId",
        //     },
        // },
    },
    {
        tableName: "stock_payments",
        timestamps: false,
    }
);

// StockPayment.belongsTo(Stock, {
//     foreignKey: "stockId",
//     as: "stock"
// });

module.exports = StockPayment;