import express from 'express';
import {
  createJokes,
  getJoke,
  getListJokesLocal,
  removeJokes,
  showJokes,
  updateJokes,
} from '../Controllers/JokesController';

const JokesRouter = express.Router();

// ===================================================================================

JokesRouter.route('/').get(getListJokesLocal).post(createJokes);
JokesRouter.get('/random/:type?', getJoke);
JokesRouter.route('/:id').delete(removeJokes).get(showJokes).put(updateJokes);

// ===================================================================================

export default JokesRouter;
