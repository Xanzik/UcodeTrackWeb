import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
const app = express();
const port = 3000;

import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js'
import postRouter from './routes/postRouter.js'
import commentRouter from './routes/commentRouter.js';

import errorMiddleware from './middlewares/error-middlewares.js';

app.use(fileUpload({}));
app.use(express.json());
app.use(express.static('static'));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
