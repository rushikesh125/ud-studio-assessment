// app/page.js
'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, logout } from '../store/authSlice';
import { SearchBar } from '@/components/SearchBar';
import { TopSearchesBanner } from '@/components/TopSearchesBanner';
import { ImageGrid } from '@/components/ImageGrid';
import { SelectedCounter } from '@/components/SelectedCounter';
import { SearchHistorySidebar } from '@/components/SearchHistorySidebar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth);

  // Fetch user on mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Show loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Image Search</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 font-medium">
              {user.name || user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 2. Top Searches Banner */}
        <TopSearchesBanner />

        {/* 3. Search Functionality */}
        <SearchBar />

        {/* 4. Multi-Select Counter */}
        <SelectedCounter />

        {/* Grid + Sidebar */}
        <div className="flex gap-6 mt-6">
          {/* Left: Image Grid */}
          <div className="flex-1">
            <ImageGrid />
          </div>

          {/* Right: User's Search History */}
          <SearchHistorySidebar />
        </div>
      </main>
    </div>
  );
}
