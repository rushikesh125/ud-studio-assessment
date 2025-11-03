
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSearches, searchImages } from '../store/searchSlice';
import { TrendingUp } from 'lucide-react';

export function TopSearchesBanner() {
  const dispatch = useDispatch();
  const { topSearches } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchTopSearches());
  }, [dispatch]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-5 w-5 text-theme-primary" />
        <h3 className="font-semibold text-gray-800">Trending Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {topSearches.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No trends yet</p>
        ) : (
          topSearches.map((item, index) => (
            <button
              key={item.term}
              onClick={() => dispatch(searchImages(item.term))}
              className="px-3 py-1.5 text-sm bg-theme-primary/10 hover:bg-theme-primary/20 text-theme-primary rounded-lg border border-theme-primary/20 transition-colors duration-200 flex items-center gap-1"
            >
              <span>{item.term}</span>
              <span className="text-xs bg-theme-primary text-white rounded-full px-1.5 py-0.5 min-w-[24px] text-center">
                {item.count}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}




export function SelectedCounter() {
  const selected = useSelector((state) => state.search.selected);

  if (selected.size === 0) return null;

  return (
    <div className="mt-4">
      <div className="inline-flex items-center gap-2 bg-theme-primary/10 text-theme-primary px-4 py-2 rounded-lg border border-theme-primary/20">
        <div className="h-2 w-2 bg-theme-primary rounded-full"></div>
        <span className="text-sm font-medium">Selected: {selected.size} images</span>
      </div>
    </div>
  );
}