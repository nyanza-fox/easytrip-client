'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const OrderCancelPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      const response = await fetch(`api/orders/${sessionId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      // if (!response.ok) {
      //   const data = await response.json();
      //   const message = data.message || 'Failed to cancel the order';
      //   toast.error(message);
      // }

      router.replace('/orders');
      router.refresh();
    })();
  }, [sessionId, router]);

  return (
    <div className="m-8">
      <h1>Order Cancelled</h1>
    </div>
  );
};

export default OrderCancelPage;
