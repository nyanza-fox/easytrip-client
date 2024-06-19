import { Metadata } from 'next';

import { APP_NAME, APP_URL } from '@/constants/meta';
import GenerateDestinations from '@/components/GenerateDestinations';

export const metadata: Metadata = {
  title: 'Generate Destinations',
  alternates: {
    canonical: '/destinations/generate',
  },
  openGraph: {
    title: `Generate Destinations | ${APP_NAME}`,
    url: `${APP_URL}/destinations/generate`,
  },
};

const GenerateDestinationsPage = () => {
  return (
    <section className="flex flex-col gap-4 max-w-screen-xl mx-auto p-4">
      <div>
        <h2 className="text-xl font-bold">Generate Destinations</h2>
        <p className="text-slate-500">Generate available destinations based on your prompt.</p>
      </div>

      <GenerateDestinations />
    </section>
  );
};

export default GenerateDestinationsPage;
