require("dotenv").config()
const app = require("./app")
const connectDB = require("./db/mongo")

const PORT = process.env.PORT || 4000

async function startServer() {
  await connectDB()
  app.listen(PORT, () =>
    console.log(`🚀 Transaction Service running on port ${PORT}`)
  )
}

startServer()