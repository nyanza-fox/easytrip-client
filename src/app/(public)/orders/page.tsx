import { cookies } from 'next/headers';

import { API_URL } from '@/constants/url';
import { BaseResponse } from '@/types/response';
import { Order } from '@/types/order';

const fetchMyOrders = async (): Promise<Order[]> => {
  const loginInfo = cookies().get('loginInfo');

  const { token } = JSON.parse(loginInfo?.value || '');

  const response = await fetch(`${API_URL}/users/me/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const data: BaseResponse<Order[]> = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data || [];
};

const OrdersPage = async () => {
  const orders = await fetchMyOrders();

  return (
    <div className="m-8">
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-4">
          <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
          <div className="flex justify-between">
            <p>Type: {order.package.type}</p>
            <p>Total: {order.package.totalPrice}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
