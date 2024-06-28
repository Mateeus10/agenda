import mongoose from 'mongoose';
import app from './app';


import dotenv from 'dotenv';


dotenv.config()

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true

}, console.log('OK'))

const port = process.env.APP_PORT;

app.listen(port);

