const router = require("express").Router()
const { createTransaction } = require("../controllers/transaction.controller")

router.post("/", createTransaction)

module.exports = router