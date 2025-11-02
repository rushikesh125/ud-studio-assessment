
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaFacebook } from 'react-icons/fa';

export function LoginButtons() {
  const login = (provider) => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => login('google')} className="w-full" size="lg">
        <FcGoogle className="mr-2 h-5 w-5" /> Continue with Google
      </Button>
      <Button onClick={() => login('github')} variant="outline" className="w-full" size="lg">
        <FaGithub className="mr-2 h-5 w-5" /> Continue with GitHub
      </Button>
      <Button onClick={() => login('facebook')} variant="outline" className="w-full" size="lg">
        <FaFacebook className="mr-2 h-5 w-5 text-blue-600" /> Continue with Facebook
      </Button>
    </div>
  );
}