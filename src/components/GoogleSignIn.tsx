'use client';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const GoogleSignIn = () => {
  const router = useRouter();

  const onSuccess = async (gResponse: CredentialResponse) => {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: gResponse.credential }),
    });
    const data = await response.json();

    if (!response.ok) {
      const message = data.message || 'Failed to login';
      router.replace(`/auth/sign-in?error=${encodeURIComponent(message)}`);
    }

    data.data?.role === 'admin' ? router.replace('/cms') : router.replace('/');
    router.refresh();
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin onSuccess={onSuccess} />
    </div>
  );
};

export default GoogleSignIn;
