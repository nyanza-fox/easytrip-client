import { Destination } from "@/types/destination";
import Link from "next/link";

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <>
      <Link
        href={`/destinations/${destination._id}`}
        className="card card-compact w-40 lg:min-w-72 bg-base-100 shadow-xl"
      >
        <picture className="px-2 pt-2 ">
          <img
            src={destination.images[0]}
            alt="Image"
            className="rounded-xl h-32 lg:h-44 object-cover object-center"
          />
        </picture>
        <div className="card-body">
          <h2 className="font-semibold lg:text-lg">{destination.name}</h2>
          <div className="flex flex-row gap-1 text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <p className="text-xs">
              {destination.location.city}, {destination.location.country}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DestinationCard;
