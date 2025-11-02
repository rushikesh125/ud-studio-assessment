// components/TopSearchesBanner.js
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSearches, searchImages } from '../store/searchSlice';
import { Button } from './ui/button';

export function TopSearchesBanner() {
  const dispatch = useDispatch();
  const { topSearches } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchTopSearches());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg shadow-md">
      <p className="text-sm font-medium mb-2">Trending Searches</p>
      <div className="flex flex-wrap gap-2">
        {topSearches.length === 0 ? (
          <p className="text-sm opacity-80">No trends yet</p>
        ) : (
          topSearches.map((item) => (
            <Button
              key={item.term}
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0"
              onClick={() => dispatch(searchImages(item.term))}
            >
              {item.term} ({item.count})
            </Button>
          ))
        )}
      </div>
    </div>
  );
}