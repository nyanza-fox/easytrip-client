'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CompletePage = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        const response = await fetch(`api/orders/${sessionId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'completed' }),
        });
        const data = await response.json();
        console.log(data, 'Berhasil memperbarui status');

        router.replace('/orders');
      } catch (error) {
        console.log('Gagal memperbarui status:', error);
      }
    })();
  }, [sessionId, router]);

  return (
    <div className="m-8">
      <h1>Pembayaran Berhasil</h1>
    </div>
  );
};

export default CompletePage;
