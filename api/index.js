import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import authRoute from './routes/auth.router.js';
import orderRoute from './routes/order.router.js';

dotenv.config();
const app = express();

const { PORT } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);

app.get('/status', (req, res) => {
  res.json('We up! 🚀');
});

app.use('/account', authRoute);
app.use('/order_items', orderRoute);

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.use((err, req, res, _next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// server();
app.listen(PORT, () => console.log(`Running on ${PORT} 🚀`));
