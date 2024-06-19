import { Metadata } from 'next';
import Link from 'next/link';

import { createTransportation } from '@/app/(pages)/cms/transportations/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import ErrorAlert from '@/components/ErrorAlert';

export const metadata: Metadata = {
  title: 'Create Transportation',
  alternates: {
    canonical: `/cms/transportations/create`,
  },
  openGraph: {
    title: `Create Transportation | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/transportations/create`,
  },
};

const CreateTransportationPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create Transportation</h2>

      <ErrorAlert />

      <form action={createTransportation} className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Company</span>
          </div>
          <input type="text" id="company" name="company" className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <input type="text" id="type" name="type" className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input type="number" id="price" name="price" className="input input-bordered w-full" />
        </label>

        <div className="mt-2">
          <h4 className="text-md font-semibold">Departure</h4>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Time</span>
                </div>
                <input
                  type="time"
                  id="departureTime"
                  name="departureTime"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Place</span>
                </div>
                <input
                  type="text"
                  id="departurePlace"
                  name="departurePlace"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  type="text"
                  id="departureCity"
                  name="departureCity"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">State</span>
                </div>
                <input
                  type="text"
                  id="departureState"
                  name="departureState"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Country</span>
                </div>
                <input
                  type="text"
                  id="departureCountry"
                  name="departureCountry"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h4 className="text-md font-semibold">Arrival</h4>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Time</span>
                </div>
                <input
                  type="time"
                  id="arrivalTime"
                  name="arrivalTime"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Place</span>
                </div>
                <input
                  type="text"
                  id="arrivalPlace"
                  name="arrivalPlace"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  type="text"
                  id="arrivalCity"
                  name="arrivalCity"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">State</span>
                </div>
                <input
                  type="text"
                  id="arrivalState"
                  name="arrivalState"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Country</span>
                </div>
                <input
                  type="text"
                  id="arrivalCountry"
                  name="arrivalCountry"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-2 my-2">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <Link href="/cms/transportations" className="btn btn-error">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateTransportationPage;
