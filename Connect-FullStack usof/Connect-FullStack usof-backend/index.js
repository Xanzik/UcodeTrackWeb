import 'dotenv/config';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { admin } from './admin/admin.js';

import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';
import { adminRouter } from './admin/admin.js';

import errorMiddleware from './middlewares/error-middlewares.js';
import { initDB } from './db/index.js';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(fileUpload({}));
app.use(
	cors({
		credentials: true,
		origin: `${process.env.CLIENT_URL}`,
	}),
);
app.use(express.json());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/api/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);
app.use(admin.options.rootPath, adminRouter);
app.use(errorMiddleware);

async function bootstrap() {
	try {
		await initDB();

		app.listen(port, () => {
			console.log(
				`Server started on ${process.env.API_URL + process.env.PORT}`,
			);
		});
	} catch (e) {
		console.error('Failed to start server:', e);
		process.exit(1);
	}
}

bootstrap();
