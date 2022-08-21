import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import snackRoutes from './routes/snackRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
// app.use(express.urlencoded({ extended: true }));

// middleware for logging what path & method were invoked
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/accounts', userRoutes);
app.use('/snacklist', snackRoutes);

// app.get('/', (req, res) =>{
// 	res.send('well hello there!')
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log('DB Connected'));
  } catch (err) {
    console.log('DB ERROR', err);
  }
};

start();
