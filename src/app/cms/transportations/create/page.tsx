import Link from 'next/link';

import { createTransportation } from '@/app/cms/transportations/actions';
import ErrorAlert from '@/components/ErrorAlert';

const CreateTransportationPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Create Transportation</h2>

      <ErrorAlert />

      <form action={createTransportation} className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Type</span>
          </div>
          <input type="text" id="type" name="type" className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Company</span>
          </div>
          <input type="text" id="company" name="company" className="input input-bordered w-full" />
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
              <span className="label-text">Departure Time</span>
            </div>
            <input
              type="datetime-local"
              id="departureTime"
              name="departureTime"
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

export default CreateTransportationPage;
