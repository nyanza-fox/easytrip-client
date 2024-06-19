'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthCallbackPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = searchParams.token;
      const role = searchParams.role;
      const image = searchParams.image;

      await fetch('/api/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, role, image }),
      });

      router.replace('/');
      router.refresh();
    })();
  }, [searchParams, router]);

  return null;
};

export default AuthCallbackPage;
