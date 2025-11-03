
"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, logoutUser } from "../store/authSlice";
import { SearchBar } from "@/components/SearchBar";
import { TopSearchesBanner } from "@/components/TopSearchesBanner";
import { ImageGrid } from "@/components/ImageGrid";
import { SelectedCounter } from "@/components/SelectedCounter";
import { SearchHistorySidebar } from "@/components/SearchHistorySidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Images } from "lucide-react";
import { UserDropdown } from "@/components/UserDropdown";
import Loading from "./loading";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  
  if (loading) {
    return (
      <Loading/>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-theme-primary/10 rounded-lg">
              <Images className="h-6 w-6 text-theme-primary" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Image Search</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserDropdown />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <TopSearchesBanner />
        </div>
        
        <div className="mb-6">
          <SearchBar />
        </div>
        
        <div className="mb-6">
          <SelectedCounter />
        </div>
        
        <div className="flex gap-6">
          <div className="flex-1">
            <ImageGrid />
          </div>
          <div className="hidden lg:block">
            <SearchHistorySidebar />
          </div>
        </div>
      </main>
    </div>
  );
}