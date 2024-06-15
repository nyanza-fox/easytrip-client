import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import CMSDeleteAction from '@/components/CMSDeleteAction';
import CMSDetailAction from '@/components/CMSDetailAction';
import CMSPagination from '@/components/CMSPagination';

import type { Guide } from '@/types/guide';
import type { BaseResponse } from '@/types/response';

export const metadata: Metadata = {
  title: 'Guides',
  alternates: {
    canonical: `/cms/guides`,
  },
  openGraph: {
    title: `Guides | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/guides`,
  },
};

const fetchGuides = async (
  page: number = 1,
  limit: number = 10
): Promise<BaseResponse<Guide[]>> => {
  const response = await fetch(`${API_URL}/guides?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data;
};

const GuidesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: guides, pagination } = await fetchGuides(Number(searchParams?.page) || 1);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Guides</h2>

      <Link href="/cms/guides/create" className="btn btn-primary w-fit">
        Add Guide
      </Link>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Languages</th>
              <th>Price Per Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides?.map((guide) => (
              <tr key={guide._id}>
                <td>{guide.name}</td>
                <td>{guide.languages.join(', ')}</td>
                <td>
                  {Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                    guide.pricePerDay
                  )}
                </td>
                <td className="flex gap-1">
                  <CMSDetailAction>
                    <div className="flex flex-col gap-4">
                      <h2 className="text-xl font-bold">{guide.name}</h2>
                      <figure className="relative w-full h-80 overflow-hidden">
                        <Image
                          src={guide.image}
                          alt={guide.name}
                          sizes="100%"
                          fill
                          className="object-cover"
                        />
                      </figure>
                      <div>
                        <p className="font-bold">Languages:</p>
                        <p>{guide.languages.join(', ')}</p>
                      </div>
                      <div>
                        <p className="font-bold">Location:</p>
                        <p>
                          {guide.location.city}, {guide.location.country}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Price Per Day:</p>
                        <p>
                          {Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(guide.pricePerDay)}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Contact:</p>
                        <p>
                          {guide.contact.email} - {guide.contact.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </CMSDetailAction>
                  <Link href={`/cms/guides/update/${guide._id}`} className="btn btn-warning">
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
                  <CMSDeleteAction endpoint={`/guides/${guide._id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CMSPagination
        pathname="/cms/guides"
        currentPage={Number(searchParams?.page || 1)}
        totalPage={pagination?.totalPage || 0}
      />
    </section>
  );
};

export default GuidesPage;
