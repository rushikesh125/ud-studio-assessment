import express from 'express';
import { protect } from '../middleware/auth.js';
import { searchImages, getTopSearches } from '../controllers/searchController.js';

const searchRouter = express.Router();

searchRouter.post('/', protect, searchImages);
searchRouter.get('/top-searches', getTopSearches);

export default searchRouter;