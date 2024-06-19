import Link from 'next/link';
import Image from 'next/image';

import { API_URL } from '@/constants/url';
import Banner from '@/components/Banner';
import DestinationCard from '@/components/DestinationCard';

import type { Destination } from '@/types/destination';
import type { BaseResponse } from '@/types/response';

const fetchPublicDestinations = async (
  page: number = 1,
  limit: number = 4
): Promise<BaseResponse<Destination[]>> => {
  const response = await fetch(`${API_URL}/public/destinations?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data;
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: destinations } = await fetchPublicDestinations(Number(searchParams?.page) || 1);

  return (
    <>
      <Banner />

      <section className="flex flex-col max-w-screen-xl gap-4 px-4 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Popular Place</h1>
            <p className="text-slate-500">Let&apos;s enjoy this heaven on earth</p>
          </div>
          <Link href={'/destinations'} className="btn">
            See All &nbsp; ❯
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {destinations?.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      </section>

      <section className="flex flex-col max-w-screen-xl gap-6 px-4 py-6 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center">Travel to make sweet memories</h1>
          <p className="text-slate-500">Find trips that fit a flexible lifestyle</p>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-8 md:flex-row">
          <div className="flex flex-col gap-6">
            <div>
              <div className="badge badge-primary badge-sm lg:badge-md">01</div>
              <h3 className="text-lg font-semibold">Find trip that fit your freedom</h3>
              <p className="text-slate-500">
                Traveling over freedom and flexibility, solitude, spontanelty, privacy, purpose.
              </p>
            </div>
            <div>
              <div className="badge badge-secondary badge-sm lg:badge-md">02</div>
              <h3 className="text-lg font-semibold">Get back to nature by travel</h3>
              <p className="text-slate-500">
                The world is a playground and you can finally explore nature&apos;s inimitable
                canvas.
              </p>
            </div>
            <div>
              <div className="badge badge-accent badge-sm lg:badge-md">03</div>
              <h3 className="text-lg font-semibold">Reignite those travel tastebuds</h3>
              <p className="text-slate-500">
                There are infinite reasons to love travel, one of them being the food, glorious
                food.
              </p>
            </div>
          </div>
          <figure className="relative w-full max-w-96 h-[30rem] overflow-hidden rounded-xl">
            <Image
              src="/image1.jpg"
              alt="image1"
              sizes="100%"
              fill
              priority
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="flex flex-col max-w-screen-xl gap-6 px-4 py-6 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Let&apos;s go on an adventure</h1>
          <p className="text-slate-500">Find and book unique travel experiences</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Image src="/landmark1.jpg" alt="landmark1" width={150} height={150} />
          <Image src="/landmark2.jpg" alt="landmark2" width={150} height={150} />
          <Image src="/landmark3.jpg" alt="landmark3" width={150} height={150} />
          <Image src="/landmark4.jpg" alt="landmark4" width={150} height={150} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
