import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

export const searchUnsplash = async (query, page = 1, perPage = 20) => {
  try {
    const response = await axios.get(UNSPLASH_URL, {
      params: { query, page, per_page: perPage },
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });
    return {
      total: response.data.total,
      results: response.data.results.map(img => ({
        id: img.id,
        url: img.urls.small,
        alt: img.alt_description || 'Unsplash image',
        width: img.width,
        height: img.height,
      })),
    };
  } catch (error) {
    throw new Error('Unsplash API error: ' + error.response?.data || error.message);
  }
};