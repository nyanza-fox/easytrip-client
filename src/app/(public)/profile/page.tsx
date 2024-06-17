import { API_URL } from '@/constants/url';
import { BaseResponse } from '@/types/response';
import { User } from '@/types/user';
import Link from 'next/link';

const fetchProfile = async (): Promise<BaseResponse<User>> => {
  const response = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
};

export default async function ProfilePage() {
  const { data } = await fetchProfile();

  return (
    <div className="flex flex-col m-10 mx-auto">
      <section className="flex ml-5">
        <div className="flex gap-3 text-primary font-bold">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </p>
          <p>Profile</p>
        </div>
      </section>

      <section className="flex flex-row rounded-lg shadow-lg m-5 justify-center">
        <div className="">
          <div className="p-5 w-[400px]">
            <img
              className="rounded-md"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="flex flex-col p-5">
          {/* this is for profile info not form such name, email, phone number, birthdate */}
          <div className="mb-4">
            <h1 className="text-base font-bold text-primary">Name :</h1>
            <p className="font-semibold text-gray-500">Full Name</p>
          </div>
          <div className="mb-4">
            <h1 className="text-base font-bold text-primary">Email :</h1>
            <p className="font-semibold text-gray-500">Emailnya</p>
          </div>
          <div className="mb-4">
            <h1 className="text-base font-bold text-primary">Phone Number :</h1>
            <p className="font-semibold text-gray-500">Nomer HPnya</p>
          </div>
          <div className="mb-4">
            <h1 className="text-base font-bold text-primary">Birthdate :</h1>
            <p className="font-semibold text-gray-500">Tanggal lahirnya</p>
          </div>
          <div>
            <Link href={'profile/edit'} className="btn btn-outline btn-primary w-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
