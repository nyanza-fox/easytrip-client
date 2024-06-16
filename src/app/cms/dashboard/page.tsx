import { Metadata } from 'next';

import { APP_NAME, APP_URL } from '@/constants/meta';
import { API_URL } from '@/constants/url';
import { BaseResponse } from '@/types/response';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dashboard',
  alternates: {
    canonical: `/cms/dashboard`,
  },
  openGraph: {
    title: `Dashboard | ${APP_NAME} CMS`,
    url: `${APP_URL}/cms/dashboard`,
  },
};

const fetchDestination = async (): Promise<
  Record<
    | 'totalDestinations'
    | 'totalAccommodations'
    | 'totalGuides'
    | 'totalTransportations'
    | 'totalUsers',
    number
  >
> => {
  const destinationsResponse = await fetch(`${API_URL}/destinations?page=1&limit=1`, {
    cache: 'no-store',
  });
  const accommodationsResponse = await fetch(`${API_URL}/accommodations?page=1&limit=1`, {
    cache: 'no-store',
  });
  const guidesResponse = await fetch(`${API_URL}/guides?page=1&limit=1`, {
    cache: 'no-store',
  });
  const transportationsResponse = await fetch(`${API_URL}/transportations?page=1&limit=1`, {
    cache: 'no-store',
  });
  const usersResponse = await fetch(`${API_URL}/users?page=1&limit=1`, {
    cache: 'no-store',
  });

  const destinationsData: BaseResponse<unknown> = await destinationsResponse.json();
  const accommodationsData: BaseResponse<unknown> = await accommodationsResponse.json();
  const guidesData: BaseResponse<unknown> = await guidesResponse.json();
  const transportationsData: BaseResponse<unknown> = await transportationsResponse.json();
  const usersData: BaseResponse<unknown> = await usersResponse.json();

  return {
    totalDestinations: destinationsData.pagination?.totalData || 0,
    totalAccommodations: accommodationsData.pagination?.totalData || 0,
    totalGuides: guidesData.pagination?.totalData || 0,
    totalTransportations: transportationsData.pagination?.totalData || 0,
    totalUsers: usersData.pagination?.totalData || 0,
  };
};

const DashboardPage = async () => {
  const data = await fetchDestination();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="card shadow-xl image-full h-full">
          <figure className="relative overflow-hidden">
            <Image
              src="https://digitaltravelcouple.com/wp-content/uploads/2022/06/nusa-penida-things-to-do-.jpg"
              alt="Destination Background"
              sizes="100%"
              fill
              className="object-cover"
            />
          </figure>
          <div className="card-body items-center justify-center">
            <h5 className="text-md font-semibold">Total Destinations</h5>
            <h1 className="text-5xl font-bold">{data.totalDestinations}</h1>
          </div>
        </div>

        <div className="card shadow-xl image-full h-full">
          <figure className="relative overflow-hidden">
            <Image
              src="https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67822455-e064b52f61938a1c4eda7877d91a8f68.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640"
              alt="Accommodation Background"
              sizes="100%"
              fill
              className="object-cover"
            />
          </figure>
          <div className="card-body items-center justify-center">
            <h5 className="text-md font-semibold">Total Accommodations</h5>
            <h1 className="text-5xl font-bold">{data.totalAccommodations}</h1>
          </div>
        </div>

        <div className="card shadow-xl image-full h-full">
          <figure className="relative overflow-hidden">
            <Image
              src="https://plus.unsplash.com/premium_photo-1718146018869-a3034b0f291a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Guide Background"
              sizes="100%"
              fill
              className="object-cover"
            />
          </figure>
          <div className="card-body items-center justify-center">
            <h5 className="text-md font-semibold">Total Guides</h5>
            <h1 className="text-5xl font-bold">{data.totalGuides}</h1>
          </div>
        </div>

        <div className="card shadow-xl image-full h-full">
          <figure className="relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Transportation Background"
              sizes="100%"
              fill
              className="object-cover"
            />
          </figure>
          <div className="card-body items-center justify-center">
            <h5 className="text-md font-semibold">Total Transportations</h5>
            <h1 className="text-5xl font-bold">{data.totalTransportations}</h1>
          </div>
        </div>

        <div className="card shadow-xl image-full h-full">
          <figure className="relative overflow-hidden">
            <Image
              src="https://plus.unsplash.com/premium_photo-1718146019167-110481171ad2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User Background"
              sizes="100%"
              fill
              className="object-cover"
            />
          </figure>
          <div className="card-body items-center justify-center">
            <h5 className="text-md font-semibold">Total Users</h5>
            <h1 className="text-5xl font-bold">{data.totalUsers}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
