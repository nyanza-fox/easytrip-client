import Link from 'next/link';

import { API_URL } from '@/constants/url';
import DestinationCard from '@/components/DestinationCard';

import type { Destination } from '@/types/destination';
import type { BaseResponse } from '@/types/response';

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
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Explore more</h1>
        <p className="text-slate-500">Let&apos;s go on an adventure</p>
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
