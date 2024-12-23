const Stock = require("../model/Stock");
const StockPayment = require("../model/StockPayment");

async function createStockPayment(req, res) {
    try {
        const { cashAmount, chequeAmount, due, vat, total, stocks } = req.body;

        // Validate input
        if (!Array.isArray(stocks) || stocks.length === 0) {
            return res.status(400).json({ message: "No stock data provided" });
        }

        // Fetch stock data and calculate total
        const stockIds = stocks.map(stock => stock.stockId);
        const stockRecords = await Stock.findAll({ where: { stockId: stockIds } });

        if (stockRecords.length !== stocks.length) {
            return res.status(400).json({
                message: "One or more stock IDs are invalid",
            });
        }

        let calculatedTotal = 0;
        for (const stock of stocks) {
            const stockRecord = stockRecords.find(s => s.stockId === stock.stockId);
            if (!stockRecord) {
                return res.status(400).json({ message: `Invalid stock ID: ${stock.stockId}` });
            }

            // Calculate total for this stock (price * quantity)
            calculatedTotal += stockRecord.stockPrice * stock.stockQty;
        }

        // Add VAT (if applicable)
        calculatedTotal += vat || 0;

        // Create stock payment
        const newStockPayment = await StockPayment.create({
            cashAmount,
            chequeAmount,
            due,
            vat,
            total: calculatedTotal,
            stockQty: stocks.reduce((sum, stock) => sum + stock.stockQty, 0),
        });

        res.status(201).json({
            message: "Stock payment created successfully",
            payment: newStockPayment,
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            console.error("Validation errors:", error.errors);
            return res
                .status(400)
                .json({ error: "Validation error: Please check the provided data." });
        }
        return res.status(500).json({
            error: `An internal error occurred: ${error.message}`,
        });
    }
}

async function getAllStockPayments(req, res) {
    try {
        const stockPayments = await StockPayment.findAll({
            include: [
                {
                    model: Stock,
                    as: "stock",
                },
            ],
        });

        if (stockPayments.length === 0) {
            return res.status(404).json({ message: "No stock payments found" });
        }

        res.status(200).json(stockPayments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An internal error occurred: ${error.message}` });
    }
}

async function getStockPaymentById(req, res) {
    try {
        const { id } = req.params;

        const stockPayment = await StockPayment.findByPk(id, {
            include: [
                { model: Stock, as: "stock" },
            ],
        });

        if (!stockPayment) {
            return res.status(404).json({ message: `StockPayment not found for ID: ${id}` });
        }

        res.status(200).json(stockPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An internal error occurred: ${error.message}` });
    }
}

module.exports = {
    createStockPayment,
    getAllStockPayments,
    getStockPaymentById,
};
