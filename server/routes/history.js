import express from 'express';
import { protect } from '../middleware/auth.js';
import { getUserHistory } from '../controllers/historyController.js';

const historyRouter = express.Router();

historyRouter.get('/', protect, getUserHistory);

export default historyRouter;