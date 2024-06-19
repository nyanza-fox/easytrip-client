'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
      await fetch('/api/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, role }),
      });

      router.replace('/');
      router.refresh();
    })();
  }, [searchParams, router]);

  return null;
};

export default AuthCallbackPage;

// import { redirect } from 'next/navigation';

// const createCookie = async (key: string, value: { token: string; role: string }) => {
//   console.log('jere');
//   const response = await fetch('/api/auth/facebook', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ [key]: value }),
//   });
//   const data = await response.json();

//   if (!response.ok) {
//     return redirect(`/auth/sign-in?error=${encodeURIComponent(data.error.message)}`);
//   }

//   return redirect('/');
// };

// const AuthCallbackPage = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) => {
//   const token = searchParams.token as string;
//   const role = searchParams.role as string;

//   console.log('afksdakdsffkj', token, role);

//   await createCookie('loginInfo', { token, role });

//   return null;
// };

// export default AuthCallbackPage;
