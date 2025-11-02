
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistory } from '../store/searchSlice';
import { Clock } from 'lucide-react';

export function SearchHistorySidebar() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.search.history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4" /> History
      </h3>
      <div className="space-y-2 text-sm">
        {history.map((h, i) => (
          <div key={i} className="text-gray-600">
            <p className="font-medium">{h.term}</p>
            <p className="text-xs text-gray-400">
              {new Date(h.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}