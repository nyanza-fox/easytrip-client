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
      <section className="flex flex-col gap-4 max-w-screen-xl mx-auto p-4">
        <div role="alert" className="alert alert-error rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>Destination not found</span>
        </div>
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

      {loginInfo && loginInfo.value.length ? (
        <section className="flex flex-col gap-4 max-w-screen-xl mx-auto p-4">
          <div>
            <h2 className="text-xl font-bold">Generate Trip Packages</h2>
            <p className="text-slate-500">
              Fill the form below to generate available trip packages
            </p>
          </div>
          <DestinationPackages destinationId={destination._id} />
        </section>
      ) : (
        <section className="flex flex-col gap-4 max-w-screen-xl mx-auto p-4">
          <div role="alert" className="alert alert-warning rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>You need to sign in to generate trip packages</span>
          </div>
        </section>
      )}
    </>
  );
};

export default DestinationDetailPage;
