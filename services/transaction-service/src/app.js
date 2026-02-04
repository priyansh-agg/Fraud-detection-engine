const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")

const transactionRoutes = require("./routes/transaction.routes")

const app = express()

app.use(helmet())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/transactions", transactionRoutes)

module.exports = app