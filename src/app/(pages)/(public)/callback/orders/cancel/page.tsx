'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const OrderCancelPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      await fetch(`/api/orders/${sessionId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      toast.success('Order cancelled successfully');

      router.replace('/orders');
      router.refresh();
    })();
  }, [sessionId, router]);

  return (
    <section className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Cancelling order...</h1>
    </section>
  );
};

export default OrderCancelPage;
