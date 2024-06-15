import { Metadata } from 'next';
import Link from 'next/link';

import { createDestination } from '@/app/cms/destinations/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import ErrorAlert from '@/components/ErrorAlert';

export const metadata: Metadata = {
  title: 'Create Destination',
  alternates: {
    canonical: `/cms/destinations/create`,
  },
  openGraph: {
    title: `Create Destination | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/destinations/create`,
  },
};

const CreateDestinationPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create Destination</h2>

      <ErrorAlert />

      <form action={createDestination} className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input type="text" id="name" name="name" className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered h-24"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image URL</span>
          </div>
          <input type="text" id="images" name="images" className="input input-bordered w-full" />
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
          <input type="number" id="price" name="price" className="input input-bordered w-full" />
        </label>

        <div className="flex gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">City</span>
            </div>
            <input type="text" id="city" name="city" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Country</span>
            </div>
            <input
              type="text"
              id="country"
              name="country"
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
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="flex gap-2 my-2">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <Link href="/cms/destinations" className="btn btn-error">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateDestinationPage;
