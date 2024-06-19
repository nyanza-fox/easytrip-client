import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { updateTransportation } from '@/app/(pages)/cms/transportations/actions';
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
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/transportations/${id}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Company</span>
          </div>
          <input
            type="text"
            id="company"
            name="company"
            defaultValue={transportation.company}
            className="w-full input input-bordered"
          />
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <input
            type="text"
            id="type"
            name="type"
            defaultValue={transportation.type}
            className="w-full input input-bordered"
          />
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={transportation.price.toString()}
            className="w-full input input-bordered"
          />
        </label>

        <div className="mt-2">
          <h4 className="font-semibold text-md">Departure</h4>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Time</span>
                </div>
                <input
                  type="time"
                  id="departureTime"
                  name="departureTime"
                  defaultValue={new Date(transportation.departure.time).toISOString().slice(0, 16)}
                  className="w-full input input-bordered"
                />
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Place</span>
                </div>
                <input
                  type="text"
                  id="departurePlace"
                  name="departurePlace"
                  defaultValue={transportation.departure.place}
                  className="w-full input input-bordered"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  type="text"
                  id="departureCity"
                  name="departureCity"
                  defaultValue={transportation.departure.location.city}
                  className="w-full input input-bordered"
                />
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">State</span>
                </div>
                <input
                  type="text"
                  id="departureState"
                  name="departureState"
                  defaultValue={transportation.departure.location.state}
                  className="w-full input input-bordered"
                />
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Country</span>
                </div>
                <input
                  type="text"
                  id="departureCountry"
                  name="departureCountry"
                  defaultValue={transportation.departure.location.country}
                  className="w-full input input-bordered"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h4 className="font-semibold text-md">Arrival</h4>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Time</span>
                </div>
                <input
                  type="time"
                  id="arrivalTime"
                  name="arrivalTime"
                  defaultValue={new Date(transportation.arrival.time).toISOString().slice(0, 16)}
                  className="w-full input input-bordered"
                />
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Place</span>
                </div>
                <input
                  type="text"
                  id="arrivalPlace"
                  name="arrivalPlace"
                  defaultValue={transportation.arrival.place}
                  className="w-full input input-bordered"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <input
                  type="text"
                  id="arrivalCity"
                  name="arrivalCity"
                  defaultValue={transportation.arrival.location.city}
                  className="w-full input input-bordered"
                />
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">State</span>
                </div>
                <input
                  type="text"
                  id="arrivalState"
                  name="arrivalState"
                  defaultValue={transportation.arrival.location.state}
                  className="w-full input input-bordered"
                />
              </label>

              <label className="w-full form-control">
                <div className="label">
                  <span className="label-text">Country</span>
                </div>
                <input
                  type="text"
                  id="arrivalCountry"
                  name="arrivalCountry"
                  defaultValue={transportation.arrival.location.country}
                  className="w-full input input-bordered"
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
