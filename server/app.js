const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./router/user');
const cinemaRouter = require('./router/cinema');
const { fetchTMDB } = require('./controller/tmdb');
const authMW = require('./middleware/authMW');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/cinema', cinemaRouter);

module.exports = app;
