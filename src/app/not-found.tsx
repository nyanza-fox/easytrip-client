import { APP_NAME, APP_URL } from '@/constants/meta';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
  alternates: {
    canonical: '/*',
  },
  openGraph: {
    title: `Not Found | ${APP_NAME}`,
    url: `${APP_URL}/*`,
  },
};

const NotFoundPage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">404 | Not Found</h1>
    </section>
  );
};

export default NotFoundPage;
