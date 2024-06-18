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
    <>
      <section>
        <div className="flex flex-col items-center pt-10 md:items-start md:px-10 lg:px-20">
          <h1 className="sm:text-lg md:text-xl lg:text-2xl font-bold">Explore more</h1>
          <p className="text-sm md:text-base lg:text-lg text-slate-500 ">
            Let&apos;s go on an adventure
          </p>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-4 p-5">
          {destinations?.map((destination) => {
            return <DestinationCard key={destination._id} destination={destination} />;
          })}
        </div>
        <div className="join flex justify-center items-center">
          {[...Array(pagination?.totalPage || 0)].map((_, idx) => (
            <Link
              key={idx}
              href={`/destinations?page=${idx + 1}`}
              className={`join-item btn ${
                searchParams?.page === String(idx + 1) ? 'btn-active' : ''
              }`}
            >
              {idx + 1}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default DestinationPage;
