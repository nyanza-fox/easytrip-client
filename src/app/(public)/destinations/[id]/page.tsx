import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import { numberToRupiah } from '@/utils/currency';
import DestinationGallery from '@/components/DestinationGallery';
import DestinationPackages from '@/components/DestinationPackages';
import DestinationMap from '@/components/DestinationMap';

import type { Destination } from '@/types/destination';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const destination = await fetchDestinationById(params.id);

  return {
    title: `${destination?.name}`,
    alternates: {
      canonical: `/destinations/${params.id}`,
    },
    openGraph: {
      title: `${destination?.name} | ${APP_NAME}`,
      url: `${APP_URL}/destinations/${params.id}`,
    },
  };
};

const fetchDestinationById = async (id: string): Promise<Destination | null> => {
  const response = await fetch(`${API_URL}/destinations/${id}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data.data || null;
};

const DestinationDetailPage = async ({ params }: { params: { id: string } }) => {
  const destination = await fetchDestinationById(params.id);

  if (!destination) {
    return (
      <section>
        <h1>Destination not found</h1>
      </section>
    );
  }

  const loginInfo = cookies().get('loginInfo');

  return (
    <>
      <section className="flex flex-col gap-4 max-w-screen-xl mx-auto p-4">
        <h1 className="text-2xl font-bold">{destination.name}</h1>

        <div className="flex flex-col gap-6 md:gap-4 md:flex-row mb-4">
          <DestinationGallery name={destination.name} images={destination.images} />

          <article className="flex flex-col gap-4">
            <div>
              <h4 className="font-bold">Description</h4>
              <p>{destination.description}</p>
            </div>
            <div>
              <h4 className="font-bold">Location</h4>
              <p>
                {destination.location.city}, {destination.location.country}
              </p>
            </div>
            <div>
              <h4 className="font-bold">Price</h4>
              <p>{numberToRupiah(destination.price)}</p>
            </div>
          </article>
        </div>
      </section>

      {destination.location.coordinates?.length === 2 && (
        <section className="flex flex-col gap-4 max-w-screen-xl mx-auto p-4">
          <div>
            <h2 className="text-xl font-bold">Destination Map</h2>
            <p className="text-slate-500">Find the destination on the map</p>
          </div>
          <DestinationMap coordinates={destination.location.coordinates} />
        </section>
      )}

      {loginInfo && loginInfo.value.length && (
        <section className="flex flex-col gap-4 max-w-screen-xl mx-auto p-4">
          <div>
            <h2 className="text-xl font-bold">Generate Trip Packages</h2>
            <p className="text-slate-500">
              Fill the form below to generate available trip packages
            </p>
          </div>
          <DestinationPackages destinationId={destination._id} />
        </section>
      )}
    </>
  );
};

export default DestinationDetailPage;
