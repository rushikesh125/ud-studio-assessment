"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchImages } from "../store/searchSlice";

export function SearchBar() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.search.loading);

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      dispatch(searchImages(term.trim()));
      setTerm("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2 mt-6 max-w-2xl mx-auto w-full"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search for images..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="pl-10 pr-4 py-6 text-base border-gray-300 focus:border-theme-primary focus:ring-theme-primary/20 rounded-xl shadow-sm"
          disabled={loading}
        />
      </div>
      <Button
        type="submit"
        disabled={loading || !term.trim()}
        className="px-6 py-6 rounded-xl bg-theme-primary hover:bg-theme-primary/90 transition-colors duration-200"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Search className="h-4 w-4" />
            Search
          </>
        )}
      </Button>
    </form>
  );
}
