import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import { updateGuide } from '@/app/cms/guides/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import ErrorAlert from '@/components/ErrorAlert';

import type { Guide } from '@/types/guide';
import { cookies } from 'next/headers';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => ({
  title: 'Update Guide',
  alternates: {
    canonical: `/cms/guides/update/${params.id}`,
  },
  openGraph: {
    title: `Update Guide | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/guides/update/${params.id}`,
  },
});

const fetchGuide = async (id: string): Promise<Guide> => {
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/guides/${id}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={guide.name}
            className="w-full input input-bordered"
          />
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Languages</span>
          </div>
          <input
            type="text"
            id="languages"
            name="languages"
            defaultValue={guide.languages.join(', ')}
            className="w-full input input-bordered"
          />
          <div className="pb-0 label">
            <span className="text-gray-500 label-text-alt">If multiple, separate with comma.</span>
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Rating</span>
          </div>
          <input
            type="number"
            id="rating"
            name="rating"
            defaultValue={guide.rating}
            className="w-full input input-bordered"
          />
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Image URL</span>
          </div>
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={guide.image}
            className="w-full input input-bordered"
          />
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Price Per Day</span>
          </div>
          <input
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            defaultValue={guide.pricePerDay}
            className="w-full input input-bordered"
          />
        </label>

        <div className="flex gap-2">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">City</span>
            </div>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={guide.location.city}
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
              defaultValue={guide.location.state}
              className="w-full input input-bordered"
            />
          </label>

          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Country</span>
            </div>
            <input
              type="text"
              id="country"
              name="country"
              defaultValue={guide.location.country}
              className="w-full input input-bordered"
            />
          </label>
        </div>

        <div className="flex gap-2">
          <label className="w-full form-control">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={guide.contact.email}
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
              defaultValue={guide.contact.phoneNumber}
              className="w-full input input-bordered"
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
