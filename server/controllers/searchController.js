
import Search from '../models/Search.js';
import { searchUnsplash } from '../utils/unsplash.js';

export const searchImages = async (req, res) => {
  const { term } = req.body;
  const userId = req.user.id;

  if (!term?.trim()) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    
    await Search.create({
      userId,
      term: term.trim().toLowerCase(),
    });

    
    const { total, results } = await searchUnsplash(term);

    res.json({
      message: `You searched for "${term}"`,
      count: total,
      images: results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTopSearches = async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      { $group: { _id: '$term', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { term: '$_id', count: 1, _id: 0 } },
    ]);

    res.json(topSearches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};