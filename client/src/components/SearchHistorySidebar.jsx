
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from '../store/searchSlice';
import { Clock, Search } from 'lucide-react';

export function SearchHistorySidebar() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.search.history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  return (
    <div className="w-72 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-theme-primary" />
        <h3 className="font-semibold text-gray-800">Recent Searches</h3>
      </div>
      <div className="space-y-3">
        {history.length === 0 ? (
          <p className="text-sm text-gray-500 italic text-center py-4">No search history</p>
        ) : (
          history.map((h, i) => (
            <div 
              key={i} 
              className="p-3 rounded-lg border border-gray-100 hover:border-theme-primary/30 hover:bg-theme-primary/5 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <Search className="h-4 w-4 text-theme-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{h.term}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(h.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}