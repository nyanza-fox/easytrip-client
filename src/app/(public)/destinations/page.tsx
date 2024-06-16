import DestinationCard from "@/components/DestinationCard";

import { API_URL } from "@/constants/url";
import type { Destination } from "@/types/destination";
import type { BaseResponse } from "@/types/response";

const fetchPublicDestinations = async (
  page: number = 1,
  limit: number = 10
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
        <div className="flex flex-row justify-between pt-10 px-20">
          <h1 className="text-2xl font-bold">Choose your destination</h1>
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
        <div className="join flex justify-center items-center">
          <button className="join-item btn">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
      </section>
    </>
  );
};

export default DestinationPage;
