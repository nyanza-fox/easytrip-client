'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { API_URL } from '@/constants/url';

const CancelPage = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        const response = await fetch(`${API_URL}/orders/${sessionId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'cancelled' }),
        });
        const data = await response.json();

        router.replace('/orders');
      } catch (error) {
        console.log('Gagal memperbarui status:', error);
      }
    })();
  }, [sessionId, router]);

  return (
    <div className="m-8">
      <h1>Pembayaran Dicancel</h1>
    </div>
  );
};

export default CancelPage;
