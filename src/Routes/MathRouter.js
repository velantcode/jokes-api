import express from 'express';
import { getMCM, getSumNumber } from '../Controllers/MathController';

const MathRouter = express.Router();

// ===================================================================================

MathRouter.get('/sum', getSumNumber);
MathRouter.get('/mcm', getMCM);

// ===================================================================================

export default MathRouter;
