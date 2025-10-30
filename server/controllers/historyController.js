import Search from '../models/Search.js';

export const getUserHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await Search.find({ userId })
      .sort({ createdAt: -1 })
      .select('term createdAt')
      .limit(20);

    res.json(
      history.map(h => ({
        term: h.term,
        timestamp: h.createdAt,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};