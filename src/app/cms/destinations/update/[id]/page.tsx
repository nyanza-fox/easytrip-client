import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { updateDestination } from '@/app/cms/destinations/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import ErrorAlert from '@/components/ErrorAlert';

import type { Destination } from '@/types/destination';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => ({
  title: 'Update Destination',
  alternates: {
    canonical: `/cms/destinations/update/${params.id}`,
  },
  openGraph: {
    title: `Update Destination | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/destinations/update/${params.id}`,
  },
});

const fetchDestination = async (id: string): Promise<Destination> => {
  const response = await fetch(`${API_URL}/destinations/${id}`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    const message = data.message || 'Failed to fetch destination';
    return redirect(`/cms/destinations?error=${encodeURIComponent(message)}`);
  }

  return data.data;
};

const UpdateDestinationPage = async ({ params }: { params: { id: string } }) => {
  const destination = await fetchDestination(params.id);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Update Destination</h2>

      <ErrorAlert />

      <form action={updateDestination.bind(null, params.id)} className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={destination.name}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            id="description"
            name="description"
            defaultValue={destination.description}
            className="textarea textarea-bordered h-24"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image URL</span>
          </div>
          <input
            type="text"
            id="images"
            name="images"
            defaultValue={destination.images.join(', ')}
            className="input input-bordered w-full"
          />
          <div className="label pb-0">
            <span className="label-text-alt text-gray-500">If multiple, separate with comma.</span>
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Attractions</span>
          </div>
          <input
            type="text"
            id="attractions"
            name="attractions"
            defaultValue={destination.attractions.join(', ')}
            className="input input-bordered w-full"
          />
          <div className="label pb-0">
            <span className="label-text-alt text-gray-500">If multiple, separate with comma.</span>
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={destination.price.toString()}
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">City</span>
            </div>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={destination.location.city}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Country</span>
            </div>
            <input
              type="text"
              id="country"
              name="country"
              defaultValue={destination.location.country}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Latitude</span>
            </div>
            <input
              type="number"
              id="latitude"
              name="latitude"
              defaultValue={destination.location.coordinates[0].toString()}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Longitude</span>
            </div>
            <input
              type="number"
              id="longitude"
              name="longitude"
              defaultValue={destination.location.coordinates[1].toString()}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="flex gap-2 my-2">
          <button type="submit" className="btn btn-warning">
            Update
          </button>
          <Link href="/cms/destinations" className="btn btn-error">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default UpdateDestinationPage;
