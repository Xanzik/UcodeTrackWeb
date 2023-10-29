require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');

const errorMiddleware = require('./middlewares/error-middlewares.js');

app.use(fileUpload({}));
app.use(express.json());
app.use(express.static('static'));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api', userRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
