'use client';

import { useRef } from 'react';
import Image from 'next/image';

import { numberToRupiah } from '@/utils/currency';

import type { Order } from '@/types/order';

const OrderCard = ({ _id, status, package: pack, itinerary, createdAt }: Order) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <article
      className={`card card-compact bg-base-100 shadow-xl border border-l-8 ${
        pack.type === 'budget'
          ? 'border-error'
          : pack.type === 'standard'
          ? 'border-warning'
          : 'border-success'
      }`}
    >
      <div className="card-body">
        <h5 className="text-md font-semibold">Order ID: {_id}</h5>
        <p>
          {new Date(createdAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="divider m-0" />
        <h2 className="card-title capitalize">{pack.type} Pack</h2>
        <div>
          <h4 className="text-md font-semibold">Transportations:</h4>
          {!!pack.transportations?.length ? (
            <ul className="list-disc list-inside">
              {pack.transportations.map((transportation, idx) => (
                <li key={idx}>{transportation?.company || '-'}</li>
              ))}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>
        <div>
          <h4 className="text-md font-semibold">Accommodation:</h4>
          <p>{pack.accommodation?.name || '-'}</p>
        </div>
        <div>
          <h4 className="text-md font-semibold">Guide:</h4>
          <p>{pack.guide?.name || '-'}</p>
        </div>
        <div className="divider m-0" />
        <div className="card-actions flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-lg font-semibold">{numberToRupiah(pack.totalPrice)}</h3>
            <div
              className={`badge font-bold badge-outline ${
                status === 'pending'
                  ? 'badge-warning'
                  : status === 'completed'
                  ? 'badge-success'
                  : 'badge-error'
              }`}
            >
              {status}
            </div>
          </div>
          <div className="flex w-full gap-2">
            <button
              className="btn btn-primary btn-outline grow"
              onClick={() => modalRef.current?.showModal()}
            >
              Show Details
            </button>
          </div>
        </div>
      </div>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => modalRef.current?.close()}
          >
            ✕
          </button>

          <h2 className="font-bold text-lg capitalize">{pack.type} Pack</h2>

          <div className="divider my-2" />

          <div className="flex flex-col gap-4">
            {status === 'completed' && (
              <div role="alert" className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Our team will contact you shortly to confirm your order.</span>
              </div>
            )}

            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-lg font-bold">Order Details</h4>
              <div>
                <h5 className="text-md font-semibold">Order ID:</h5>
                <p>{_id}</p>
              </div>
              <div>
                <h5 className="text-md font-semibold">Status:</h5>
                <div
                  className={`badge font-bold badge-outline ${
                    status === 'pending'
                      ? 'badge-warning'
                      : status === 'completed'
                      ? 'badge-success'
                      : 'badge-error'
                  }`}
                >
                  {status}
                </div>
              </div>
            </div>

            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-lg font-bold">Destination</h4>
              {!!pack.destination?.images.length && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {pack.destination?.images.map((image, idx) => (
                    <figure key={idx} className="relative min-w-32 h-32 overflow-hidden rounded-xl">
                      <Image
                        src={image}
                        alt={`${pack.destination?.name}-${idx}`}
                        sizes="100%"
                        fill
                        priority
                        className="object-cover"
                      />
                    </figure>
                  ))}
                </div>
              )}
              <div>
                <h5 className="text-md font-semibold">Name:</h5>
                <p>{pack.destination?.name}</p>
              </div>
              <div>
                <h5 className="text-md font-semibold">Location:</h5>
                <p>
                  {pack.destination?.location.city}, {pack.destination?.location.country}
                </p>
              </div>
              <div>
                <h5 className="text-md font-semibold">Price:</h5>
                <p>{numberToRupiah(pack.destination?.price || 0)}</p>
              </div>
            </div>

            {!!pack.transportations?.length ? (
              <>
                {pack.transportations.map((transportation, idx) => (
                  <article key={idx} className="border-2 p-4 rounded-xl flex flex-col gap-2">
                    <h2 className="text-lg font-bold">Transportation #{idx + 1}</h2>
                    <div>
                      <h5 className="text-md font-semibold">Type:</h5>
                      <p>{transportation?.type || '-'}</p>
                    </div>
                    <div>
                      <h5 className="text-md font-semibold">Company:</h5>
                      <p>{transportation?.company || '-'}</p>
                    </div>
                    <div>
                      <h5 className="text-md font-semibold">Departure:</h5>
                      <p>{transportation?.departure.place || '-'}</p>
                    </div>
                    <div>
                      <h5 className="text-md font-semibold">Arrival:</h5>
                      <p>{transportation?.arrival.place || '-'}</p>
                    </div>
                    <div>
                      <h5 className="text-md font-semibold">Price:</h5>
                      <p>
                        {numberToRupiah(transportation?.price || 0)} x {pack.totalGuests} guest(s) ={' '}
                        {numberToRupiah((transportation?.price || 0) * pack.totalGuests)}
                      </p>
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <p>-</p>
            )}

            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h3 className="text-lg font-bold">Accommodation</h3>
              {!!pack.accommodation?.images.length && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {pack.accommodation.images.map((image, idx) => (
                    <figure key={idx} className="relative min-w-32 h-32 overflow-hidden rounded-xl">
                      <Image
                        src={image}
                        alt={`${pack.accommodation?.name}-${idx}`}
                        sizes="100%"
                        fill
                        priority
                        className="object-cover"
                      />
                    </figure>
                  ))}
                </div>
              )}
              <div>
                <h4 className="text-md font-semibold">Name:</h4>
                <p>{pack.accommodation?.name || '-'}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Location:</h4>
                <p>
                  {pack.accommodation?.location.city}, {pack.accommodation?.location.country}
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Price:</h4>
                <p>
                  {numberToRupiah(pack.accommodation?.pricePerNight || 0)} x {pack.totalDays}{' '}
                  night(s) ={' '}
                  {numberToRupiah((pack.accommodation?.pricePerNight || 0) * pack.totalDays)}
                </p>
              </div>
            </div>

            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-lg font-bold">Guide</h4>
              {pack.guide?.image && (
                <figure className="relative w-32 h-32 overflow-hidden rounded-xl">
                  <Image
                    src={pack.guide?.image}
                    alt={pack.guide?.name}
                    sizes="100%"
                    fill
                    priority
                    className="object-cover"
                  />
                </figure>
              )}
              <div>
                <h4 className="text-md font-semibold">Name:</h4>
                <p>{pack.guide?.name || '-'}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Language:</h4>
                <p>{pack.guide?.languages.join(', ') || '-'}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Location:</h4>
                <p>
                  {pack.guide?.location.city || '-'}, {pack.guide?.location.country || '-'}
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Price:</h4>
                <p>
                  {numberToRupiah(pack.guide?.pricePerDay || 0)} x {pack.totalDays} day(s) ={' '}
                  {numberToRupiah((pack.guide?.pricePerDay || 0) * pack.totalDays)}
                </p>
              </div>
            </div>

            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-lg font-bold">Summary</h4>
              <div>
                <h4 className="text-md font-semibold">Total Guests:</h4>
                <p>{pack.totalGuests}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Total Days:</h4>
                <p>{pack.totalDays}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Total Price:</h4>
                <p>{numberToRupiah(pack.totalPrice)}</p>
              </div>
            </div>

            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-lg font-bold">Itinerary Suggestion</h4>
              {!!itinerary.length ? (
                <>
                  {itinerary.map((item, idx) => (
                    <div key={idx}>
                      <h5 className="text-md font-semibold">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </h5>
                      <ul className="list-disc list-inside">
                        {item.activities.map((activity, idx) => (
                          <li key={idx}>
                            {activity.time} - {activity.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              ) : (
                <p>-</p>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </article>
  );
};

export default OrderCard;
