import { redirect } from 'next/navigation';
import Link from 'next/link';

import { updateTransportation } from '@/app/cms/transportations/actions';
import { API_URL } from '@/constants/url';
import ErrorAlert from '@/components/ErrorAlert';

import type { Transportation } from '@/types/transportation';

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

        <div className="flex gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Departure Time</span>
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
              <span className="label-text">Departure Location</span>
            </div>
            <input
              type="text"
              id="departureLocation"
              name="departureLocation"
              defaultValue={transportation.departure.location}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Arrival Time</span>
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
              <span className="label-text">Arrival Location</span>
            </div>
            <input
              type="text"
              id="arrivalLocation"
              name="arrivalLocation"
              defaultValue={transportation.arrival.location}
              className="input input-bordered w-full"
            />
          </label>
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
