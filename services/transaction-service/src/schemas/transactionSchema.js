const { z } = require("zod")

const transactionSchema = z.object({
  userId: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  deviceId: z.string(),
  location: z.string(),
})

module.exports = { transactionSchema }