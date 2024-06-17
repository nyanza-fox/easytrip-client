import { Metadata } from 'next';
import Link from 'next/link';

import { createAccommodation } from '@/app/cms/accommodations/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import ErrorAlert from '@/components/ErrorAlert';

export const metadata: Metadata = {
  title: 'Create Accommodation',
  alternates: {
    canonical: `/cms/accommodations/create`,
  },
  openGraph: {
    title: `Create Accommodation | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/accommodations/create`,
  },
};

const CreateAccommodationPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create Accommodation</h2>

      <ErrorAlert />

      <form action={createAccommodation} className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input type="text" id="name" name="name" className="input input-bordered w-full" />
        </label>

        <div className="flex flex-col sm:flex-row gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Type</span>
            </div>
            <input type="text" id="type" name="type" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Rating</span>
            </div>
            <input
              type="number"
              id="rating"
              name="rating"
              className="input input-bordered w-full"
            />
          </label>
        </div>

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
            <span className="label-text">Facilities</span>
          </div>
          <input
            type="text"
            id="facilities"
            name="facilities"
            className="input input-bordered w-full"
          />
          <div className="label pb-0">
            <span className="label-text-alt text-gray-500">If multiple, separate with comma.</span>
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Max Guests</span>
          </div>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price Per Night</span>
          </div>
          <input
            type="number"
            id="pricePerNight"
            name="pricePerNight"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input type="text" id="address" name="address" className="input input-bordered w-full" />
        </label>

        <div className="flex flex-col sm:flex-row gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">City</span>
            </div>
            <input type="text" id="city" name="city" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">State</span>
            </div>
            <input type="text" id="state" name="state" className="input input-bordered w-full" />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
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

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Zip Code</span>
            </div>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input type="email" id="email" name="email" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="flex gap-2 my-2">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <Link href="/cms/accommodations" className="btn btn-error">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateAccommodationPage;
