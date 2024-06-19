'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

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
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onGeneratePackages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const packagesResponse = await fetch(`/api/destinations/${destinationId}/packages`, {
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

      const itineraryResponse = await fetch(`/api/destinations/${destinationId}/itinerary`, {
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
      toast.success('Packages generated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="flex flex-col md:items-end md:flex-row gap-2" onSubmit={onGeneratePackages}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Departure</span>
          </div>
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
            <option value="DKI Jakarta">Jawa Tengah</option>
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Total Guests</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full"
            value={form.totalGuests === 0 ? '' : form.totalGuests.toString()}
            onChange={(e) => setForm({ ...form, totalGuests: parseInt(e.target.value) })}
            required
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Start Date</span>
          </div>
          <input
            type="date"
            placeholder="Start Date"
            className="input input-bordered w-full"
            min={new Date().toISOString().split('T')[0]}
            value={form.startDate.toISOString().split('T')[0]}
            onChange={(e) => setForm({ ...form, startDate: new Date(e.target.value) })}
            required
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">End Date</span>
          </div>
          <input
            type="date"
            placeholder="End Date"
            className="input input-bordered w-full"
            min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
            value={form.endDate.toISOString().split('T')[0]}
            onChange={(e) => setForm({ ...form, endDate: new Date(e.target.value) })}
            required
          />
        </label>

        {isLoading ? (
          <button type="submit" className="btn btn-primary mt-2 md:mt-0" disabled>
            <div className="loading loading-spinner" />
            Generating
          </button>
        ) : (
          <button type="submit" className="btn btn-primary mt-2 md:mt-0">
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
        <div className="min-h-[30rem] bg-slate-100 flex flex-col gap-4 items-center justify-center text-center rounded-xl p-4">
          <Image
            src="/easytrip-logo-blue.png"
            width={100}
            height={100}
            alt="Logo"
            className="animate-bounce"
          />
          <p className="font-semibold">Your package recommendations will appear here.</p>
        </div>
      )}
    </>
  );
};

export default DestinationPackages;
