require('dotenv').config()
const connectDB = require('./db/connect')
const Medicine = require('./models/Med')
const jsonMeds = require('./medicines.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Medicine.deleteMany()
    await Medicine.create(jsonMeds)
    console.log('Sucsess!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}; start()