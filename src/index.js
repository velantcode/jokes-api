import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import Database from './database';
import _404Router from './Routes/_404Router';
import JokesRouter from './Routes/JokesRouter';
import MyRouterFile from './Routes/MyRouterFile';
import MathRouter from './Routes/MathRouter';

// connect to database
Database();

const app = express();

// settings
app.use(morgan('dev'));
app.use(cors());

// middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// show only in develop or testing
app.use(express.static('public'));

app.use('/', MyRouterFile);
app.use('/jokes', JokesRouter);
app.use('/math', MathRouter);
app.use('/*', _404Router);

app.listen(9000, async () => {
  console.log('================================================');
  console.log(`Server running on port: ${9000}`);
  console.log('================================================');
});

export default app;
