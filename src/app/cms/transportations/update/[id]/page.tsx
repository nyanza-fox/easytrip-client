import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { updateTransportation } from '@/app/cms/transportations/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import ErrorAlert from '@/components/ErrorAlert';

import type { Transportation } from '@/types/transportation';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => ({
  title: 'Update Transportation',
  alternates: {
    canonical: `/cms/transportations/update/${params.id}`,
  },
  openGraph: {
    title: `Update Transportation | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/transportations/update/${params.id}`,
  },
});

const fetchTransportation = async (id: string): Promise<Transportation> => {
  const response = await fetch(`${API_URL}/transportations/${id}`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    const message = data.message || 'Failed to fetch transportation';
    return redirect(`/cms/transportations?error=${encodeURIComponent(message)}`);
  }

  return data.data;
};

const UpdateTransportationPage = async ({ params }: { params: { id: string } }) => {
  const transportation = await fetchTransportation(params.id);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Update Transportation</h2>

      <ErrorAlert />

      <form action={updateTransportation.bind(null, params.id)} className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <input
            type="text"
            id="type"
            name="type"
            defaultValue={transportation.type}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Company</span>
          </div>
          <input
            type="text"
            id="company"
            name="company"
            defaultValue={transportation.company}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={transportation.price.toString()}
            className="input input-bordered w-full"
          />
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
                  type="datetime-local"
                  id="departureTime"
                  name="departureTime"
                  defaultValue={new Date(transportation.departure.time).toISOString().slice(0, 16)}
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
                  defaultValue={transportation.departure.place}
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  type="text"
                  id="departureCity"
                  name="departureCity"
                  defaultValue={transportation.departure.location.city}
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
                  defaultValue={transportation.departure.location.state}
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
                  defaultValue={transportation.departure.location.country}
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
                  type="datetime-local"
                  id="arrivalTime"
                  name="arrivalTime"
                  defaultValue={new Date(transportation.arrival.time).toISOString().slice(0, 16)}
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
                  defaultValue={transportation.arrival.place}
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  type="text"
                  id="arrivalCity"
                  name="arrivalCity"
                  defaultValue={transportation.arrival.location.city}
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
                  defaultValue={transportation.arrival.location.state}
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
                  defaultValue={transportation.arrival.location.country}
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-2 my-2">
          <button type="submit" className="btn btn-warning">
            Update
          </button>
          <Link href="/cms/transportations" className="btn btn-error">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default UpdateTransportationPage;
