import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { updateAccommodation } from '@/app/cms/accommodations/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import ErrorAlert from '@/components/ErrorAlert';

import type { Accommodation } from '@/types/accommodation';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => ({
  title: 'Update Accommodation',
  alternates: {
    canonical: `/cms/accommodations/update/${params.id}`,
  },
  openGraph: {
    title: `Update Accommodation | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/accommodations/update/${params.id}`,
  },
});

const fetchAccommodation = async (id: string): Promise<Accommodation> => {
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/accommodations/${id}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    const message = data.message || 'Failed to fetch accommodation';
    return redirect(`/cms/accommodations?error=${encodeURIComponent(message)}`);
  }

  return data.data;
};

const UpdateAccommodationPage = async ({ params }: { params: { id: string } }) => {
  const accommodation = await fetchAccommodation(params.id);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Update Accommodation</h2>

      <ErrorAlert />

      <form action={updateAccommodation.bind(null, params.id)} className="flex flex-col gap-2">
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={accommodation.name}
            className="w-full input input-bordered"
          />
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Type</span>
            </div>
            <input
              type="text"
              id="type"
              name="type"
              defaultValue={accommodation.type}
              className="w-full input input-bordered"
            />
          </label>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Rating</span>
            </div>
            <input
              type="number"
              id="rating"
              name="rating"
              defaultValue={accommodation.rating}
              className="w-full input input-bordered"
            />
          </label>
        </div>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Image URL</span>
          </div>
          <input
            type="text"
            id="images"
            name="images"
            defaultValue={accommodation.images.join(', ')}
            className="w-full input input-bordered"
          />
          <div className="pb-0 label">
            <span className="text-gray-500 label-text-alt">If multiple, separate with comma.</span>
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Facilities</span>
          </div>
          <input
            type="text"
            id="facilities"
            name="facilities"
            defaultValue={accommodation.facilities.join(', ')}
            className="w-full input input-bordered"
          />
          <div className="pb-0 label">
            <span className="text-gray-500 label-text-alt">If multiple, separate with comma.</span>
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Max Guests</span>
          </div>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            defaultValue={accommodation.maxGuests}
            className="w-full input input-bordered"
          />
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Price Per Night</span>
          </div>
          <input
            type="number"
            id="pricePerNight"
            name="pricePerNight"
            defaultValue={accommodation.pricePerNight}
            className="w-full input input-bordered"
          />
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            id="address"
            name="address"
            defaultValue={accommodation.location.address}
            className="w-full input input-bordered"
          />
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">City</span>
            </div>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={accommodation.location.city}
              className="w-full input input-bordered"
            />
          </label>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">State</span>
            </div>
            <input
              type="text"
              id="state"
              name="state"
              defaultValue={accommodation.location.state}
              className="w-full input input-bordered"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Country</span>
            </div>
            <input
              type="text"
              id="country"
              name="country"
              defaultValue={accommodation.location.country}
              className="w-full input input-bordered"
            />
          </label>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Zip Code</span>
            </div>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              defaultValue={accommodation.location.zipCode}
              className="w-full input input-bordered"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={accommodation.contact.email}
              className="w-full input input-bordered"
            />
          </label>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Phone Number</span>
            </div>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={accommodation.contact.phoneNumber}
              className="w-full input input-bordered"
            />
          </label>
        </div>

        <div className="flex gap-2 my-2">
          <button type="submit" className="btn btn-warning">
            Update
          </button>
          <Link href="/cms/accommodations" className="btn btn-error">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default UpdateAccommodationPage;
