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
        <div className="flex flex-row justify-between px-20 pt-5">
          <h1 className="text-2xl font-bold">Popular Place</h1>
          <Link href={"/destinations"} className="btn btn-sm">
            See All &nbsp; ❯
          </Link>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-4 p-5">
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
          <h1 className="text-2xl font-bold">Travel to make sweet memories</h1>
          <p className="text-lg text-zinc-500">
            Find trips that fit a flexible lifestyle
          </p>
        </div>
        <div className="flex flex-row justify-center m-auto w-4/5 pt-4 px-24">
          <div className="flex flex-col justify-center items-center gap-5 w-1/2  p-10">
            <div>
              <div className="badge badge-primary badge-md">01</div>
              <h1 className="text-xl font-bold">
                Find trip that fit your freedom
              </h1>
              <p>
                Traveling over freedom and flexibility, solitude, <br />
                spontanelty, privacy, purpose.
              </p>
            </div>
            <div>
              <div className="badge badge-secondary badge-md">02</div>
              <h1 className="text-xl font-bold">
                Get back to nature by travel
              </h1>
              <p>
                The world is a playground and you can finally <br /> explore
                nature&apos;s inimitable canvas.
              </p>
            </div>
            <div>
              <div className="badge badge-accent badge-md">03</div>
              <h1 className="text-xl font-bold">
                Reignite those travel tastebuds
              </h1>
              <p>
                There are infinite reasons to love travel, one of <br /> them
                being the food, glorious food.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center w-1/2 ">
            <picture>
              <img
                src="https://i.pinimg.com/564x/39/d9/2d/39d92ddb13342ed4743828325453d99e.jpg"
                alt="image"
                className="rounded-2xl h-screen"
              />
            </picture>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
