const { transactionSchema } = require("../schemas/transaction.schema")

exports.createTransaction = async (req, res) => {
  try {
    const data = transactionSchema.parse(req.body)

    // Phase 1: just acknowledge
    return res.status(201).json({
      message: "Transaction received",
      transaction: data,
    })
  } catch (err) {
    return res.status(400).json({
      error: err.errors || err.message,
    })
  }
}