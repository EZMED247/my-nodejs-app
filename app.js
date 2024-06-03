require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// ConnectDB
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/auth')
const searchRouter = require('./routes/search')
const checkPassRouter = require('./routes/checkPass')
const profileRouter = require('./routes/profile')
const medRouter = require('./routes/edit_med')
const uploadRouter = require('./routes/upload')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/search', searchRouter)
app.use('/api/v1/checkpass', checkPassRouter)
app.use('/api/v1/editprofile', profileRouter)
app.use('/api/v1/editmedicine', medRouter)
app.use('/api/v1/upload', uploadRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
}; start()
