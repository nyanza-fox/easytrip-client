import Image from 'next/image';
import Link from 'next/link';

import { API_URL } from '@/constants/url';
import CMSDeleteAction from '@/components/CMSDeleteAction';
import CMSDetailAction from '@/components/CMSDetailAction';

import type { Destination } from '@/types/destination';
import type { BaseResponse } from '@/types/response';

const fetchDestinations = async (
  page: number = 1,
  limit: number = 10
): Promise<BaseResponse<Destination[]>> => {
  const response = await fetch(`${API_URL}/destinations?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data;
};

const DestinationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: destinations, pagination } = await fetchDestinations(
    Number(searchParams?.page) || 1
  );

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Destinations</h2>

      <Link href="/cms/destinations/create" className="btn btn-primary w-fit">
        Add Destination
      </Link>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations?.map((destination) => (
              <tr key={destination._id}>
                <td>{destination.name}</td>
                <td>
                  {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                    destination.price
                  )}
                </td>
                <td>
                  {destination.location.city}, {destination.location.country}
                </td>
                <td className="flex gap-1">
                  <CMSDetailAction>
                    <div className="flex flex-col gap-4">
                      <h2 className="text-xl font-bold">{destination.name}</h2>
                      <div className="grid grid-cols-3 gap-2">
                        {destination.images.map((image, idx) => (
                          <figure key={idx} className="relative h-32 overflow-hidden">
                            <Image
                              src={image}
                              alt={destination.name}
                              sizes="100%"
                              fill
                              className="object-cover"
                            />
                          </figure>
                        ))}
                      </div>
                      <div>
                        <p className="font-bold">Location:</p>
                        <p>
                          {destination.location.city}, {destination.location.country} (
                          {destination.location.coordinates.join(', ')})
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Price:</p>
                        <p>
                          {Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(destination.price)}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Description:</p>
                        <p>{destination.description}</p>
                      </div>
                      <div>
                        <p className="font-bold">Attractions:</p>
                        <ul className="list-disc list-inside">
                          {destination.attractions.map((attraction, idx) => (
                            <li key={idx}>{attraction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CMSDetailAction>
                  <Link
                    href={`/cms/destinations/update/${destination._id}`}
                    className="btn btn-warning"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>
                  </Link>
                  <CMSDeleteAction endpoint={`/destinations/${destination._id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="join">
        {[...Array(pagination?.totalPage || 0)].map((_, idx) => (
          <Link
            key={idx}
            href={`/cms/destinations?page=${idx + 1}`}
            className={`join-item btn ${
              searchParams?.page === String(idx + 1) ? 'btn-active' : ''
            }`}
          >
            {idx + 1}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DestinationsPage;
