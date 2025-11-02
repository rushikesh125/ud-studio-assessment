// components/SearchBar.js
'use client';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchImages } from '../store/searchSlice';

export function SearchBar() {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.search.loading);

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      dispatch(searchImages(term.trim()));
      setTerm('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mt-6">
      <Input
        placeholder="Search images..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-1"
        disabled={loading}
      />
      <Button type="submit" disabled={loading || !term.trim()}>
        {loading ? (
          <span className="flex items-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Searching...
          </span>
        ) : (
          <>
            <Search className="h-4 w-4 mr-2" />
            Search
          </>
        )}
      </Button>
    </form>
  );
}