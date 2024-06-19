'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const OrderSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      const response = await fetch(`api/orders/${sessionId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }),
      });

      // if (!response.ok) {
      //   const data = await response.json();
      //   const message = data.message || 'Failed to complete the order';
      //   toast.error(message);
      // }

      router.replace('/orders');
      router.refresh();
    })();
  }, [sessionId, router]);

  return (
    <div className="m-8">
      <h1>Order Completed</h1>
    </div>
  );
};

export default OrderSuccessPage;
