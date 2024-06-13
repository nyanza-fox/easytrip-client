import { redirect } from 'next/navigation';
import Link from 'next/link';

import { updateGuide } from '@/app/cms/guides/actions';
import { API_URL } from '@/constants/url';
import ErrorAlert from '@/components/ErrorAlert';

import type { Guide } from '@/types/guide';

const fetchGuide = async (id: string): Promise<Guide> => {
  const response = await fetch(`${API_URL}/guides/${id}`, { cache: 'no-store' });
  const data = await response.json();

  if (!response.ok) {
    const message = data.message || 'Failed to fetch guide';
    return redirect(`/cms/guides?error=${encodeURIComponent(message)}`);
  }

  return data.data;
};

const UpdateGuidePage = async ({ params }: { params: { id: string } }) => {
  const guide = await fetchGuide(params.id);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Update Guide</h2>

      <ErrorAlert />

      <form action={updateGuide.bind(null, params.id)} className="flex flex-col gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={guide.name}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Languages</span>
          </div>
          <input
            type="text"
            id="languages"
            name="languages"
            defaultValue={guide.languages.join(', ')}
            className="input input-bordered w-full"
          />
          <div className="label pb-0">
            <span className="label-text-alt text-gray-500">If multiple, separate with comma.</span>
          </div>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image URL</span>
          </div>
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={guide.image}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price Per Day</span>
          </div>
          <input
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            defaultValue={guide.pricePerDay}
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={guide.contact.email}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={guide.contact.phoneNumber}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">City</span>
            </div>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={guide.location.city}
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
              defaultValue={guide.location.country}
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="flex gap-2 my-2">
          <button type="submit" className="btn btn-warning">
            Update
          </button>
          <Link href="/cms/guides" className="btn btn-error">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default UpdateGuidePage;
