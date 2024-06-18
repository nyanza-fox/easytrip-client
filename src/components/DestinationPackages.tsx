'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import { API_URL } from '@/constants/url';
import PackageCard from '@/components/PackageCard';

import type { Itinerary, Package } from '@/types/order';
import type { BaseResponse } from '@/types/response';

const DestinationPackages = ({ destinationId }: { destinationId: string }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [itinerary, setItinerary] = useState<Itinerary[]>([]);
  const [form, setForm] = useState<{
    departureState: string;
    totalGuests: number;
    startDate: Date;
    endDate: Date;
  }>({
    departureState: '',
    totalGuests: 0,
    startDate: new Date(),
    endDate: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onGeneratePackages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const packagesResponse = await fetch(`${API_URL}/destinations/${destinationId}/packages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const packagesData: BaseResponse<
        (Package & {
          totalGuests: number;
          totalDays: number;
          totalPrice: number;
        })[]
      > = await packagesResponse.json();

      if (!packagesResponse.ok) {
        const message = packagesData.message || 'Failed to generate packages';
        throw new Error(message);
      }

      setPackages(packagesData.data || []);

      const itineraryResponse = await fetch(`${API_URL}/destinations/${destinationId}/itinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const itineraryData: BaseResponse<Itinerary[]> = await itineraryResponse.json();

      if (!itineraryResponse.ok) {
        const message = itineraryData.message || 'Failed to generate itinerary';
        throw new Error(message);
      }

      setItinerary(itineraryData.data || []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold">Generate Trip Packages</h2>
        <p className="text-gray-500">Fill the form below to generate available trip packages</p>
      </div>

      <form className="flex flex-col md:flex-row gap-2" onSubmit={onGeneratePackages}>
        <select
          className="select select-bordered w-full"
          value={form.departureState}
          onChange={(e) => setForm({ ...form, departureState: e.target.value })}
          required
        >
          <option value="" disabled>
            Select Departure Location
          </option>
          <option value="Banten">Banten</option>
        </select>
        <input
          type="number"
          placeholder="Total Guests"
          className="input input-bordered w-full"
          value={form.totalGuests === 0 ? '' : form.totalGuests.toString()}
          onChange={(e) => setForm({ ...form, totalGuests: parseInt(e.target.value) })}
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          className="input input-bordered w-full"
          value={form.startDate.toISOString().split('T')[0]}
          onChange={(e) => setForm({ ...form, startDate: new Date(e.target.value) })}
          required
        />
        <input
          type="date"
          placeholder="End Date"
          className="input input-bordered w-full"
          value={form.endDate.toISOString().split('T')[0]}
          onChange={(e) => setForm({ ...form, endDate: new Date(e.target.value) })}
          required
        />
        {isLoading ? (
          <button type="submit" className="btn btn-primary" disabled>
            <div className="loading loading-spinner" />
            Generating
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Generate
          </button>
        )}
      </form>

      {!!packages.length && !!itinerary.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {packages.map((pack, idx) => (
            <PackageCard key={idx} {...pack} itinerary={itinerary} />
          ))}
        </div>
      ) : (
        <div className="min-h-[30rem] bg-blue-50 flex justify-center items-center text-center text-balance text-gray-500">
          Your generated trip packages will appear here.
        </div>
      )}
    </section>
  );
};

export default DestinationPackages;
