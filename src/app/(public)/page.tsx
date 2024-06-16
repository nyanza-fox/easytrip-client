import Link from "next/link";
import Banner from "@/components/Banner";
import DestinationCard from "@/components/DestinationCard";

import { API_URL } from "@/constants/url";
import type { Destination } from "@/types/destination";
import type { BaseResponse } from "@/types/response";

const fetchPublicDestinations = async (
  page: number = 1,
  limit: number = 4
): Promise<BaseResponse<Destination[]>> => {
  const response = await fetch(
    `${API_URL}/public/destinations?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();

  return data;
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: destinations, pagination } = await fetchPublicDestinations(
    Number(searchParams?.page) || 1
  );

  return (
    <>
      <Banner />
      <section>
        <div className="">
          <div className="flex flex-row justify-between px-10 lg:px-20 pt-5">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
              Popular Place
            </h1>
            <Link
              href={"/destinations"}
              className="btn btn-xs md:btn-sm text-xs"
            >
              See All &nbsp; ❯
            </Link>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-slate-500 px-10 lg:px-20">
            Let&apos;s enjoy this heaven on earth
          </p>
        </div>
        <div className="flex flex-row flex-wrap justify-evenly gap-3 p-5">
          {destinations?.map((destination) => {
            return (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
            Travel to make sweet memories
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-slate-500">
            Find trips that fit a flexible lifestyle
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center m-auto w-3/4 lg:w-1/2 pt-7">
          <picture className="flex h-40 md:hidden lg:hidden">
            <img
              src="/image1.jpg"
              alt="image"
              className="object-cover object-center rounded-2xl"
            />
          </picture>
          <div className="flex flex-col justify-center items-center gap-5 md:w-1/2 p-5 ">
            <div>
              <div className="badge badge-primary badge-sm lg:badge-md">01</div>
              <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                Find trip that fit your freedom
              </h1>
              <p className="text-xs md:text-sm lg:text-base text-slate-500">
                Traveling over freedom and flexibility, solitude, spontanelty,
                privacy, purpose.
              </p>
            </div>
            <div>
              <div className="badge badge-secondary badge-sm lg:badge-md">
                02
              </div>
              <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                Get back to nature by travel
              </h1>
              <p className="text-xs md:text-sm lg:text-base text-slate-500">
                The world is a playground and you can finally explore
                nature&apos;s inimitable canvas.
              </p>
            </div>
            <div>
              <div className="badge badge-accent badge-sm lg:badge-md">03</div>
              <h1 className="text-sm md:text-base lg:text-lg font-semibold">
                Reignite those travel tastebuds
              </h1>
              <p className="text-xs md:text-sm lg:text-base text-slate-500">
                There are infinite reasons to love travel, one of them being the
                food, glorious food.
              </p>
            </div>
          </div>
          <picture className="hidden md:flex lg:flex justify-center items-center w-1/2">
            <img
              src="/image1.jpg"
              alt="image"
              className="h-80 md:h-full rounded-2xl"
            />
          </picture>
        </div>
      </section>
    </>
  );
};

export default HomePage;
