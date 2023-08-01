import {config } from 'dotenv';
import express, { Application } from 'express';

config();

const app: Application  = express();
app.use(express.json());

export default app;
