import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NextTopLoader from 'nextjs-toploader';

import { APP_NAME, APP_DESCRIPTION, APP_URL } from '@/constants/meta';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: APP_DESCRIPTION,
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    type: 'website',
  },
  authors: [
    {
      name: 'Muhammad Akmal Hisyam',
      url: 'https://akmalhisyam.my.id',
    },
    {
      name: 'Badzlin Maladzi',
      url: 'https://hascine.xyz',
    },
    {
      name: 'Pristiwan Akbar Subery',
      url: 'https://pristiwanakbars.biz.id',
    },
    {
      name: 'Putri Balqis Hermayani',
      url: 'https://pbalqish.my.id',
    },
    {
      name: 'Simson Hamonangan Hutagaol',
      url: 'https://simson.id',
    },
  ],
  keywords: ['travel', 'trip', 'planner', 'booking'],
  creator: 'Nyanza Fox',
  publisher: 'Nyanza Fox',
  generator: 'Next.js',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
      <html lang="en" data-theme="light">
        <body className={inter.className}>
          <NextTopLoader color="#008DDA" showSpinner={false} />
          <Toaster position="bottom-center" />
          {children}
        </body>
      </html>
    </GoogleOAuthProvider>
  );
};

export default RootLayout;
