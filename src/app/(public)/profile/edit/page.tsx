import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { updateProfile } from '@/app/auth/actions';
import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import ErrorAlert from '@/components/ErrorAlert';

import { BaseResponse } from '@/types/response';
import { User } from '@/types/user';

export const metadata: Metadata = {
  title: 'Edit Profile',
  alternates: {
    canonical: '/profile/edit',
  },
  openGraph: {
    title: `Edit Profile | ${APP_NAME}`,
    url: `${APP_URL}/profile/edit`,
  },
};

const fetchProfile = async (): Promise<BaseResponse<User>> => {
  const loginInfo = cookies().get('loginInfo');
  const token = loginInfo ? JSON.parse(loginInfo.value).token : '';

  const response = await fetch(`${API_URL}/users/me`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: BaseResponse<User> = await response.json();

  return data;
};

const EditProfilePage = async () => {
  const profile = await fetchProfile();

  return (
    <section className="flex flex-col max-w-screen-xl gap-4 p-4 mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-slate-500">Update your profile information</p>
      </div>

      <div className="rounded-xl shadow-md border p-6">
        <form action={updateProfile} className="flex flex-col gap-4">
          <ErrorAlert />

          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={profile.data?.profile.firstName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={profile.data?.profile.lastName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={profile.data?.profile.phoneNumber}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={profile.data?.profile.image}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div>
            <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              defaultValue={profile.data?.profile.dateOfBirth?.toString()}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-warning">
              Save Changes
            </button>
            <Link href="/profile" type="button" className="btn btn-error">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfilePage;
