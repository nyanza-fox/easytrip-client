import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { API_URL } from '@/constants/url';
import OrderCard from '@/components/OrderCard';

import type { Order } from '@/types/order';
import type { BaseResponse } from '@/types/response';

const fetchMyOrders = async (): Promise<Order[]> => {
  const loginInfo = cookies().get('loginInfo');

  // if (!loginInfo) {
  //   const message = 'Please sign in to view your orders.';
  //   return redirect(`/auth/sign-in?error=${encodeURIComponent(message)}`);
  // }

  const { token } = loginInfo ? JSON.parse(loginInfo.value) : '';

  const response = await fetch(`${API_URL}/users/me/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const data: BaseResponse<Order[]> = await response.json();

  if (!response.ok) {
    const message = data.message || 'Failed to fetch orders.';
    return redirect(`/auth/sign-in?error=${encodeURIComponent(message)}`);
  }

  return data.data || [];
};

const OrdersPage = async () => {
  const orders = await fetchMyOrders();

  return (
    <div className="m-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {!!orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderCard key={order._id} {...order} />
          ))}
        </div>
      ) : (
        <p className="text-center">No orders found.</p>
      )}
    </div>
  );
};

export default OrdersPage;
