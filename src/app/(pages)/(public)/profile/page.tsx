import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';

import type { BaseResponse } from '@/types/response';
import type { User } from '@/types/user';

export const metadata: Metadata = {
  title: 'Profile',
  alternates: {
    canonical: '/profile',
  },
  openGraph: {
    title: `Profile | ${APP_NAME}`,
    url: `${APP_URL}/profile`,
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

const ProfilePage = async () => {
  const profile = await fetchProfile();

  return (
    <section className="flex flex-col max-w-screen-xl gap-4 p-4 mx-auto">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-slate-500">Manage your profile information</p>
      </div>

      <section className="flex flex-col md:flex-row rounded-xl shadow-lg p-4 gap-4 border">
        <figure className="relative w-full md:w-96 overflow-hidden h-96 rounded-xl">
          <Image
            src={profile.data?.profile.image || '/blank-profile.jpg'}
            alt={profile.data?.profile.firstName || 'Profile'}
            sizes="100%"
            fill
            priority
            className="object-cover"
          />
        </figure>
        <div className="flex flex-col">
          <div className="mb-4">
            <h1 className="text-base font-bold text-primary">Name</h1>
            <p className="font-semibold">
              {profile.data?.profile.firstName} {profile.data?.profile.lastName}
            </p>
          </div>
          <div className="mb-4">
            <h1 className="text-base font-bold text-primary">Email</h1>
            <p className="font-semibold">{profile.data?.email}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-base font-bold text-primary">Phone Number</h1>
            <p className="font-semibold">
              {profile.data?.profile.phoneNumber || 'Update your phone number'}
            </p>
          </div>
          <div className="mb-4">
            <h1 className="text-base font-bold text-primary">Date of Birth</h1>
            <p className="font-semibold">
              {new Date(profile.data?.profile.dateOfBirth || '')?.toLocaleString('en-US', {
                dateStyle: 'long',
              }) || 'Update your date of birth'}
            </p>
          </div>
          <div>
            <Link href="/profile/edit" className="btn btn-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit Profile
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
