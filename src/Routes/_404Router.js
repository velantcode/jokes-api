import express from 'express';
import { show404Messages } from '../Controllers/NotFound404Controller';

const router = express.Router();

/* ADS */
router.route('/*').delete(show404Messages).get(show404Messages).post(show404Messages).put(show404Messages);

export default router;
