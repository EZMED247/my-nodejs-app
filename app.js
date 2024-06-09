require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');

// ConnectDB
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');
const searchRouter = require('./routes/search');
const checkPassRouter = require('./routes/checkPass');
const profileRouter = require('./routes/profile');
const medRouter = require('./routes/edit_med');
const uploadRouter = require('./routes/upload');
const displayRouter = require('./routes/prescrip_ops')
const sendInquiry = require('./routes/inquiry')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// Serve static files from the "image_uploads" directory
app.use('/image_uploads', express.static(path.join(__dirname, 'image_uploads')));
// Serve files from the 'med_images' directory
app.use('/med_images', express.static(path.join(__dirname, 'med_images')));


// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/search', searchRouter)
app.use('/api/v1/checkpass', checkPassRouter)
app.use('/api/v1/editprofile', profileRouter)
app.use('/api/v1/editmedicine', medRouter)
app.use('/api/v1/upload', uploadRouter)
app.use('/api/v1/admindisplay', displayRouter)
app.use('/api/v1/sendinquiry', sendInquiry)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
