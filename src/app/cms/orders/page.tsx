import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import { numberToRupiah } from '@/utils/currency';
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
              <th>User</th>
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
                <td>{order.status}</td>
                <td className="flex gap-1">
                  <button className="btn btn-accent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="M8 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                      <path
                        fillRule="evenodd"
                        d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm5 5a3 3 0 1 0 1.524 5.585l1.196 1.195a.75.75 0 1 0 1.06-1.06l-1.195-1.196A3 3 0 0 0 9.5 7Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
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
