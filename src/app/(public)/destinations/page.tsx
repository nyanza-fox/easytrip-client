import { Metadata } from 'next';
import Link from 'next/link';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import DestinationCard from '@/components/DestinationCard';

import type { Destination } from '@/types/destination';
import type { BaseResponse } from '@/types/response';

export const metadata: Metadata = {
  title: 'Destinations',
  alternates: {
    canonical: '/destinations',
  },
  openGraph: {
    title: `Destinations | ${APP_NAME}`,
    url: `${APP_URL}/destinations`,
  },
};

const fetchPublicDestinations = async (
  page: number = 1,
  limit: number = 12
): Promise<BaseResponse<Destination[]>> => {
  const response = await fetch(`${API_URL}/public/destinations?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data;
};

const DestinationPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: destinations, pagination } = await fetchPublicDestinations(
    Number(searchParams?.page) || 1
  );

  return (
    <section className="flex flex-col max-w-screen-xl gap-4 p-4 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Explore more</h1>
          <p className="text-slate-500">Let&apos;s go on an adventure</p>
        </div>
        <Link href="/destinations/generate" className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          Find me a destination
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {destinations?.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>

      <div className="mx-auto mt-4 join">
        {[...Array(pagination?.totalPage || 0)].map((_, idx) => (
          <Link
            key={idx}
            href={`/destinations?page=${idx + 1}`}
            className={`join-item btn ${
              +(searchParams?.page || 1) === idx + 1 ? 'btn-active' : ''
            }`}
          >
            {idx + 1}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DestinationPage;
