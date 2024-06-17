import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import { numberToRupiah } from '@/utils/currency';
import CMSDeleteAction from '@/components/CMSDeleteAction';
import CMSDetailAction from '@/components/CMSDetailAction';
import CMSPagination from '@/components/CMSPagination';

import type { Accommodation } from '@/types/accommodation';
import type { BaseResponse } from '@/types/response';

export const metadata: Metadata = {
  title: 'Accommodations',
  alternates: {
    canonical: `/cms/accommodations`,
  },
  openGraph: {
    title: `Accommodations | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/accommodations`,
  },
};

const fetchAccommodations = async (
  page: number = 1,
  limit: number = 10
): Promise<BaseResponse<Accommodation[]>> => {
  const response = await fetch(`${API_URL}/accommodations?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data;
};

const AccommodationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: accommodations, pagination } = await fetchAccommodations(
    Number(searchParams?.page) || 1
  );

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Accommodations</h2>

      <Link href="/cms/accommodations/create" className="btn btn-primary w-fit">
        Add Accommodation
      </Link>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price Per Night</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accommodations?.map((accommodation) => (
              <tr key={accommodation._id}>
                <td>{accommodation.name}</td>
                <td>{accommodation.type}</td>
                <td>{numberToRupiah(accommodation.pricePerNight)}</td>
                <td>
                  {accommodation.location.state}, {accommodation.location.country}
                </td>
                <td className="flex gap-1">
                  <CMSDetailAction>
                    <div className="flex flex-col gap-4">
                      <h2 className="text-xl font-bold">{accommodation.name}</h2>
                      <div className="flex gap-2 overflow-x-auto py-2">
                        {accommodation.images.map((image, idx) => (
                          <figure
                            key={idx}
                            className="relative min-w-48 h-48 overflow-hidden rounded-xl"
                          >
                            <Image
                              src={image}
                              alt={accommodation.name}
                              sizes="100%"
                              fill
                              priority
                              className="object-cover"
                            />
                          </figure>
                        ))}
                      </div>
                      <div>
                        <p className="font-bold">Type:</p>
                        <p>{accommodation.type}</p>
                      </div>
                      <div>
                        <p className="font-bold">Rating:</p>
                        <p className="flex">
                          {[...Array(accommodation.rating)].map((_, idx) => (
                            <svg
                              key={idx}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6 text-warning"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Max Guests:</p>
                        <p>{accommodation.maxGuests}</p>
                      </div>
                      <div>
                        <p className="font-bold">Price Per Night:</p>
                        <p>{numberToRupiah(accommodation.pricePerNight)}</p>
                      </div>
                      <div>
                        <p className="font-bold">Location:</p>
                        <p>
                          {accommodation.location.city}, {accommodation.location.state},{' '}
                          {accommodation.location.country}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Contact:</p>
                        <p>{accommodation.contact.email}</p>
                        <p>{accommodation.contact.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="font-bold">Facilities:</p>
                        <ul className="list-disc list-inside">
                          {accommodation.facilities.map((facility, idx) => (
                            <li key={idx}>{facility}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CMSDetailAction>
                  <Link
                    href={`/cms/accommodations/update/${accommodation._id}`}
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
                  <CMSDeleteAction endpoint={`/accommodations/${accommodation._id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CMSPagination
        pathname="/cms/accommodations"
        currentPage={Number(searchParams?.page || 1)}
        totalPage={pagination?.totalPage || 0}
      />
    </section>
  );
};

export default AccommodationsPage;
