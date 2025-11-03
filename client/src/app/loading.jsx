import { Cog, Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader className="w-10 h-10 animate-spin text-theme-primary" />
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  );
};

export default Loading;