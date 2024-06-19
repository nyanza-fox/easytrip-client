'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

import DestinationCard from '@/components/DestinationCard';

import type { Destination } from '@/types/destination';
import type { BaseResponse } from '@/types/response';

const GenerateDestinations = () => {
  const [form, setForm] = useState<{ prompt: string }>({ prompt: '' });
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGenerateDestinations = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch('/api/destinations/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data: BaseResponse<Destination[]> = await response.json();

      if (!response.ok) {
        const message = data.message || 'Failed to generate destinations';
        throw new Error(message);
      }

      setDestinations(data.data || []);
      toast.success(data.message || 'Destinations generated successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="flex flex-col sm:flex-row gap-2" onSubmit={onGenerateDestinations}>
        <label className="flex items-center gap-2 input input-bordered w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Enter your magic words"
            value={form.prompt}
            onChange={(e) => setForm((prev) => ({ ...prev, prompt: e.target.value }))}
            required
          />
        </label>
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

      {!!destinations.length ? (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {destinations
            .filter((destination) => destination)
            .map((destination) => (
              <DestinationCard key={destination._id} destination={destination} />
            ))}
        </section>
      ) : (
        <section className="min-h-[30rem] bg-slate-100 flex flex-col gap-4 items-center justify-center text-center rounded-xl p-4">
          <Image
            src="/easytrip-logo-blue.png"
            width={100}
            height={100}
            alt="Logo"
            className="animate-bounce"
          />
          <p className="font-semibold">Your generated destinations will appear here.</p>
        </section>
      )}
    </>
  );
};

export default GenerateDestinations;
