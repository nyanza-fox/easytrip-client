import { Metadata } from 'next';
import Image from 'next/image';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import CMSDetailAction from '@/components/CMSDetailAction';
import CMSPagination from '@/components/CMSPagination';

import type { BaseResponse } from '@/types/response';
import type { User } from '@/types/user';

export const metadata: Metadata = {
  title: 'Users',
  alternates: {
    canonical: `/cms/users`,
  },
  openGraph: {
    title: `Users | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/users`,
  },
};

const fetchUsers = async (page: number = 1, limit: number = 10): Promise<BaseResponse<User[]>> => {
  const response = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`, {
    cache: 'no-store',
  });
  const data = await response.json();

  return data;
};

const UsersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: users, pagination } = await fetchUsers(Number(searchParams?.page) || 1);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Users</h2>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.profile.firstName} {user.profile.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.profile.phoneNumber}</td>
                <td className="flex gap-1">
                  <CMSDetailAction>
                    <div className="flex flex-col gap-4">
                      <h2 className="text-xl font-bold">
                        {user.profile.firstName} {user.profile.lastName}
                      </h2>
                      <figure className="relative w-full h-80 overflow-hidden rounded-xl">
                        <Image
                          src={user.profile.image || '/placeholder.png'}
                          alt={`${user.profile.firstName} ${user.profile.lastName}`}
                          sizes="100%"
                          fill
                          className="object-cover"
                        />
                      </figure>
                      <div>
                        <p className="font-bold">Email:</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="font-bold">Phone Number:</p>
                        <p>{user.profile.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="font-bold">Date Of Birth:</p>
                        <p>
                          {user.profile.dateOfBirth
                            ? new Date(user.profile.dateOfBirth).toLocaleString('en-US', {
                                dateStyle: 'long',
                              })
                            : ''}
                        </p>
                      </div>
                    </div>
                  </CMSDetailAction>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CMSPagination
        pathname="/cms/users"
        currentPage={Number(searchParams?.page || 1)}
        totalPage={pagination?.totalPage || 0}
      />
    </section>
  );
};

export default UsersPage;
