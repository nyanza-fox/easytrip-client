import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { BaseResponse } from '@/types/response';
import { User } from '@/types/user';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';

import { updateProfile } from '@/app/auth/actions';

import EditProfileForm from '@/components/EditProfileForm';

import ErrorAlert from '@/components/ErrorAlert';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Update Profile',
  alternates: {
    canonical: `/profile/edit`,
  },
  openGraph: {
    title: `Update Profile | ${APP_NAME} CMS`,
    url: `${APP_URL}/profile/edit`,
  },
};

const fetchProfile = async (): Promise<BaseResponse<User>> => {
  const loginInfo = cookies().get('loginInfo');

  const token = JSON.parse(loginInfo?.value || '');

  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  const data: BaseResponse<User> = await response.json();

  return data;
};

const EditProfilePage = async () => {
  const profile = await fetchProfile();

  return (
    <div className="m-10  rounded-md shadow-md">
      <ErrorAlert />
      <form action={updateProfile} className="p-5">
        <div className="mb-5">
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

        <div className="mb-5">
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

        <div className="mb-5">
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

        <div className="mb-5">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={profile.data?.profile.image}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">
            Birthdate
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            defaultValue={profile.data?.profile.dateOfBirth?.toString()}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
