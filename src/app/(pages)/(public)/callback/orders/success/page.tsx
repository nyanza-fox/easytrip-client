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
      await fetch(`/api/orders/${sessionId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }),
      });

      toast.success('Order completed successfully');

      router.replace('/orders');
      router.refresh();
    })();
  }, [sessionId, router]);

  return (
    <section className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Completing order...</h1>
    </section>
  );
};

export default OrderSuccessPage;
