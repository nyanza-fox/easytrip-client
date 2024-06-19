import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import { numberToRupiah } from '@/utils/currency';
import CMSDetailAction from '@/components/CMSDetailAction';
import CMSPagination from '@/components/CMSPagination';

import type { Order } from '@/types/order';
import type { BaseResponse } from '@/types/response';

export const metadata: Metadata = {
  title: 'Orders',
  alternates: {
    canonical: `/cms/orders`,
  },
  openGraph: {
    title: `Orders | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/orders`,
  },
};

const fetchOrders = async (
  page: number = 1,
  limit: number = 10
): Promise<BaseResponse<Order[]>> => {
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/orders?page=${page}&limit=${limit}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
};

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: orders, pagination } = await fetchOrders(Number(searchParams?.page) || 1);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Package Type</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order.user.email}</td>
                <td>{order.package.type}</td>
                <td>{numberToRupiah(order.package.totalPrice)}</td>
                <td>
                  <div
                    className={`badge badge-outline font-semibold ${
                      order.status === 'pending'
                        ? 'badge-warning'
                        : order.status === 'completed'
                        ? 'badge-success'
                        : 'badge-error'
                    }`}
                  >
                    {order.status}
                  </div>
                </td>
                <td className="flex gap-1">
                  <CMSDetailAction>
                    <h2 className="font-bold text-lg capitalize">{order.package.type} Pack</h2>

                    <div className="divider my-2" />

                    <div className="flex flex-col gap-4">
                      <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
                        <h4 className="text-lg font-bold">Order Details</h4>
                        <div>
                          <h5 className="text-md font-semibold">Order ID:</h5>
                          <p>{order._id}</p>
                        </div>
                        <div>
                          <h5 className="text-md font-semibold">Status:</h5>
                          <div
                            className={`badge font-bold badge-outline ${
                              order.status === 'pending'
                                ? 'badge-warning'
                                : order.status === 'completed'
                                ? 'badge-success'
                                : 'badge-error'
                            }`}
                          >
                            {order.status}
                          </div>
                        </div>
                      </div>

                      <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
                        <h4 className="text-lg font-bold">Destination</h4>
                        {!!order.package.destination?.images.length && (
                          <div className="flex gap-2 overflow-x-auto py-2">
                            {order.package.destination?.images.map((image, idx) => (
                              <figure
                                key={idx}
                                className="relative min-w-32 h-32 overflow-hidden rounded-xl"
                              >
                                <Image
                                  src={image}
                                  alt={`${order.package.destination?.name}-${idx}`}
                                  sizes="100%"
                                  fill
                                  priority
                                  className="object-cover"
                                />
                              </figure>
                            ))}
                          </div>
                        )}
                        <div>
                          <h5 className="text-md font-semibold">Name:</h5>
                          <p>{order.package.destination?.name}</p>
                        </div>
                        <div>
                          <h5 className="text-md font-semibold">Location:</h5>
                          <p>
                            {order.package.destination?.location.city},{' '}
                            {order.package.destination?.location.country}
                          </p>
                        </div>
                        <div>
                          <h5 className="text-md font-semibold">Price:</h5>
                          <p>{numberToRupiah(order.package.destination?.price || 0)}</p>
                        </div>
                      </div>

                      {!!order.package.transportations?.length ? (
                        <>
                          {order.package.transportations.map((transportation, idx) => (
                            <article
                              key={idx}
                              className="border-2 p-4 rounded-xl flex flex-col gap-2"
                            >
                              <h2 className="text-lg font-bold">Transportation #{idx + 1}</h2>
                              <div>
                                <h5 className="text-md font-semibold">Type:</h5>
                                <p>{transportation?.type || '-'}</p>
                              </div>
                              <div>
                                <h5 className="text-md font-semibold">Company:</h5>
                                <p>{transportation?.company || '-'}</p>
                              </div>
                              <div>
                                <h5 className="text-md font-semibold">Departure:</h5>
                                <p>{transportation?.departure.place || '-'}</p>
                              </div>
                              <div>
                                <h5 className="text-md font-semibold">Arrival:</h5>
                                <p>{transportation?.arrival.place || '-'}</p>
                              </div>
                              <div>
                                <h5 className="text-md font-semibold">Price:</h5>
                                <p>
                                  {numberToRupiah(transportation?.price || 0)} x{' '}
                                  {order.package.totalGuests} guest(s) ={' '}
                                  {numberToRupiah(
                                    (transportation?.price || 0) * order.package.totalGuests
                                  )}
                                </p>
                              </div>
                            </article>
                          ))}
                        </>
                      ) : (
                        <p>-</p>
                      )}

                      <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
                        <h3 className="text-lg font-bold">Accommodation</h3>
                        {!!order.package.accommodation?.images.length && (
                          <div className="flex gap-2 overflow-x-auto py-2">
                            {order.package.accommodation.images.map((image, idx) => (
                              <figure
                                key={idx}
                                className="relative min-w-32 h-32 overflow-hidden rounded-xl"
                              >
                                <Image
                                  src={image}
                                  alt={`${order.package.accommodation?.name}-${idx}`}
                                  sizes="100%"
                                  fill
                                  priority
                                  className="object-cover"
                                />
                              </figure>
                            ))}
                          </div>
                        )}
                        <div>
                          <h4 className="text-md font-semibold">Name:</h4>
                          <p>{order.package.accommodation?.name || '-'}</p>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold">Location:</h4>
                          <p>
                            {order.package.accommodation?.location.city},{' '}
                            {order.package.accommodation?.location.country}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold">Price:</h4>
                          <p>
                            {numberToRupiah(order.package.accommodation?.pricePerNight || 0)} x{' '}
                            {order.package.totalDays} night(s) ={' '}
                            {numberToRupiah(
                              (order.package.accommodation?.pricePerNight || 0) *
                                order.package.totalDays
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
                        <h4 className="text-lg font-bold">Guide</h4>
                        {order.package.guide?.image && (
                          <figure className="relative w-32 h-32 overflow-hidden rounded-xl">
                            <Image
                              src={order.package.guide?.image}
                              alt={order.package.guide?.name}
                              sizes="100%"
                              fill
                              priority
                              className="object-cover"
                            />
                          </figure>
                        )}
                        <div>
                          <h4 className="text-md font-semibold">Name:</h4>
                          <p>{order.package.guide?.name || '-'}</p>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold">Language:</h4>
                          <p>{order.package.guide?.languages.join(', ') || '-'}</p>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold">Location:</h4>
                          <p>
                            {order.package.guide?.location.city || '-'},{' '}
                            {order.package.guide?.location.country || '-'}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold">Price:</h4>
                          <p>
                            {numberToRupiah(order.package.guide?.pricePerDay || 0)} x{' '}
                            {order.package.totalDays} day(s) ={' '}
                            {numberToRupiah(
                              (order.package.guide?.pricePerDay || 0) * order.package.totalDays
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
                        <h4 className="text-lg font-bold">Summary</h4>
                        <div>
                          <h4 className="text-md font-semibold">Total Guests:</h4>
                          <p>{order.package.totalGuests}</p>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold">Total Days:</h4>
                          <p>{order.package.totalDays}</p>
                        </div>
                        <div>
                          <h4 className="text-md font-semibold">Total Price:</h4>
                          <p>{numberToRupiah(order.package.totalPrice)}</p>
                        </div>
                      </div>

                      <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
                        <h4 className="text-lg font-bold">Itinerary Suggestion</h4>
                        {!!order.itinerary.length ? (
                          <>
                            {order.itinerary.map((item, idx) => (
                              <div key={idx}>
                                <h5 className="text-md font-semibold">
                                  {new Date(item.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </h5>
                                <ul className="list-disc list-inside">
                                  {item.activities.map((activity, idx) => (
                                    <li key={idx}>
                                      {activity.time} - {activity.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p>-</p>
                        )}
                      </div>
                    </div>
                  </CMSDetailAction>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CMSPagination
        pathname="/cms/orders"
        currentPage={Number(searchParams?.page || 1)}
        totalPage={pagination?.totalPage || 0}
      />
    </section>
  );
};

export default OrdersPage;
