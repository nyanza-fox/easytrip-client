import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import { numberToRupiah } from '@/utils/currency';
import CMSDeleteAction from '@/components/CMSDeleteAction';
import CMSDetailAction from '@/components/CMSDetailAction';
import CMSPagination from '@/components/CMSPagination';

import type { Transportation } from '@/types/transportation';
import type { BaseResponse } from '@/types/response';

export const metadata: Metadata = {
  title: 'Transportations',
  alternates: {
    canonical: `/cms/transportations`,
  },
  openGraph: {
    title: `Transportations | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/transportations`,
  },
};

const fetchTransportations = async (
  page: number = 1,
  limit: number = 10
): Promise<BaseResponse<Transportation[]>> => {
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/transportations?page=${page}&limit=${limit}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
};

const TransportationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: transportations, pagination } = await fetchTransportations(
    Number(searchParams?.page) || 1
  );

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Transportations</h2>

      <Link href="/cms/transportations/create" className="btn btn-primary w-fit">
        Add Transportation
      </Link>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Company</th>
              <th>Type</th>
              <th>Price</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transportations?.map((transportation) => (
              <tr key={transportation._id}>
                <td>{transportation.company}</td>
                <td>{transportation.type}</td>
                <td>{numberToRupiah(transportation.price)}</td>
                <td>
                  {transportation.departure.location.state},{' '}
                  {transportation.departure.location.country}
                </td>
                <td>
                  {transportation.arrival.location.state},{' '}
                  {transportation.departure.location.country}
                </td>
                <td className="flex gap-1">
                  <CMSDetailAction>
                    <div className="flex flex-col gap-4">
                      <h2 className="text-xl font-bold">{transportation.company}</h2>
                      <div>
                        <p className="font-bold">Type:</p>
                        <p>{transportation.type}</p>
                      </div>
                      <div>
                        <p className="font-bold">Price:</p>
                        <p>{numberToRupiah(transportation.price)}</p>
                      </div>
                      <div>
                        <p className="font-bold">Departure:</p>
                        <p>
                          {transportation.departure.time} - {transportation.departure.place}
                        </p>
                        <p>
                          {transportation.departure.location.city},{' '}
                          {transportation.departure.location.state},{' '}
                          {transportation.departure.location.country}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">Arrival:</p>
                        <p>
                          {transportation.arrival.time} - {transportation.arrival.place}
                        </p>
                        <p>
                          {transportation.arrival.location.city},{' '}
                          {transportation.arrival.location.state},{' '}
                          {transportation.arrival.location.country}
                        </p>
                      </div>
                    </div>
                  </CMSDetailAction>
                  <Link
                    href={`/cms/transportations/update/${transportation._id}`}
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
                  <CMSDeleteAction endpoint={`/transportations/${transportation._id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CMSPagination
        pathname="/cms/transportations"
        currentPage={Number(searchParams?.page || 1)}
        totalPage={pagination?.totalPage || 0}
      />
    </section>
  );
};

export default TransportationsPage;
