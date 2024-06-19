import { Metadata } from 'next';
import Link from 'next/link';

import { createGuide } from '@/app/(pages)/cms/guides/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import ErrorAlert from '@/components/ErrorAlert';

export const metadata: Metadata = {
  title: 'Create Guide',
  alternates: {
    canonical: `/cms/guides/create`,
  },
  openGraph: {
    title: `Create Guide | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/guides/create`,
  },
};

const CreateGuidePage = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create Guide</h2>

      <ErrorAlert />

      <form action={createGuide} className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input type="text" id="name" name="name" className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Languages</span>
          </div>
          <input
            type="text"
            id="languages"
            name="languages"
            className="input input-bordered w-full"
          />
          <div className="label pb-0">
            <span className="label-text-alt text-gray-500">If multiple, separate with comma.</span>
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Rating</span>
          </div>
          <input type="number" id="rating" name="rating" className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image URL</span>
          </div>
          <input type="text" id="image" name="image" className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price Per Day</span>
          </div>
          <input
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex flex-col md:flex-row gap-2">
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
          <Link href="/cms/guides" className="btn btn-error">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateGuidePage;
