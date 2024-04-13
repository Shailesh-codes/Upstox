import express, { response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import colors from "colors";
import Upstox from "upstox"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const baseUrl = "https://api.upstox.com/v2";
const BUY_ORDER = "https://api.upstox.com/v2/order/trades"

const upstox = new Upstox(process.env.API_KEY, process.env.SECRET_KEY);

// To fetch current Holdings

app.get("/holdings", async (req, res) => {
    try {
        const holdings = await upstox.getHoldings();
        res.json(holdings);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch holdings"
        })

    }
})

const buyOrderDetails = {
    symbol: 'AAPL',
    quantity: 10,
    price: 150,
    orderType: 'LIMIT',
};

axios.post(BUY_ORDER, buyOrderDetails)
    .then(response => {
        console.log("Buy order successfully :", response.data)
    })
    .catch(error => {
        console.error('Error placing buy order:', error.response.data);
    });

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`.bgCyan)
})


