
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaFacebookF } from 'react-icons/fa';
import { Chrome, Mail } from 'lucide-react';

export function LoginButtons() {
  const login = (provider) => {
    window.location.href = `${NEXT_PUBLIC_BACKEND_API_URL}/auth/${provider}`;
  };

  return (
    <div className="space-y-3 w-full max-w-md">
      <Button 
        onClick={() => login('google')} 
        className="w-full py-6 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 transition-colors duration-200 flex items-center justify-center gap-3 shadow-sm"
      >
        <FcGoogle className="h-5 w-5" /> 
        <span className="font-medium">Continue with Google</span>
      </Button>
      
      <Button 
        onClick={() => login('github')} 
        variant="outline" 
        className="w-full py-6 rounded-xl border-gray-300 hover:bg-gray-50 text-gray-800 transition-colors duration-200 flex items-center justify-center gap-3"
      >
        <FaGithub className="h-5 w-5 text-gray-600" /> 
        <span className="font-medium">Continue with GitHub</span>
      </Button>
      
    </div>
  );
}