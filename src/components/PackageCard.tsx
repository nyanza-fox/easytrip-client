import { useRef } from 'react';
import Image from 'next/image';

import { numberToRupiah } from '@/utils/currency';

import type { Itinerary, Package } from '@/types/order';

const PackageCard = ({
  type,
  destination,
  transportations,
  accommodation,
  guide,
  totalDays,
  totalGuests,
  totalPrice,
  itinerary,
}: Package & { itinerary: Itinerary[] }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <article
      className={`card card-compact bg-base-100 shadow-xl border border-l-8 ${
        type === 'luxury'
          ? 'border-l-success'
          : type === 'standard'
          ? 'border-l-warning'
          : 'border-l-error'
      }`}
    >
      <div className="card-body">
        <h2 className="card-title capitalize">{type} Pack</h2>
        <div>
          <h4 className="text-md font-semibold">Transportations:</h4>
          {!!transportations?.length ? (
            <ul className="list-disc list-inside">
              {transportations.map((transportation, idx) => (
                <li key={idx}>{transportation?.company || '-'}</li>
              ))}
            </ul>
          ) : (
            <p>-</p>
          )}
        </div>
        <div>
          <h4 className="text-md font-semibold">Accommodation:</h4>
          <p>{accommodation?.name || '-'}</p>
        </div>
        <div>
          <h4 className="text-md font-semibold">Guide:</h4>
          <p>{guide?.name || '-'}</p>
        </div>
        <div className="divider m-0" />
        <div className="card-actions flex-col">
          <h3 className="text-lg font-semibold">{numberToRupiah(totalPrice)}</h3>
          <div className="flex w-full gap-2">
            <button
              className="btn btn-primary btn-outline grow"
              onClick={() => modalRef.current?.showModal()}
            >
              Show Details
            </button>
            <button className="btn btn-primary grow">Proceed to Book</button>
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

          <h2 className="font-bold text-lg capitalize">{type} Pack</h2>

          <div className="divider my-2" />

          <div className="flex flex-col gap-4">
            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-lg font-bold">Destination</h4>
              {!!destination?.images.length && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {destination?.images.map((image, idx) => (
                    <figure key={idx} className="relative min-w-32 h-32 overflow-hidden rounded-xl">
                      <Image
                        src={image}
                        alt={`${destination.name}-${idx}`}
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
                <p>{destination?.name}</p>
              </div>
              <div>
                <h5 className="text-md font-semibold">Location:</h5>
                <p>
                  {destination?.location.city}, {destination?.location.country}
                </p>
              </div>
              <div>
                <h5 className="text-md font-semibold">Price:</h5>
                <p>{numberToRupiah(destination?.price || 0)}</p>
              </div>
            </div>

            {!!transportations?.length ? (
              <>
                {transportations.map((transportation, idx) => (
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
                        {numberToRupiah(transportation?.price || 0)} x {totalGuests} guest(s) ={' '}
                        {numberToRupiah((transportation?.price || 0) * totalGuests)}
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
              {!!accommodation?.images.length && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {accommodation.images.map((image, idx) => (
                    <figure key={idx} className="relative min-w-32 h-32 overflow-hidden rounded-xl">
                      <Image
                        src={image}
                        alt={`${accommodation.name}-${idx}`}
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
                <p>{accommodation?.name || '-'}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Location:</h4>
                <p>
                  {accommodation?.location.city}, {accommodation?.location.country}
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Price:</h4>
                <p>
                  {numberToRupiah(accommodation?.pricePerNight || 0)} x {totalDays} night(s) ={' '}
                  {numberToRupiah((accommodation?.pricePerNight || 0) * totalDays)}
                </p>
              </div>
            </div>

            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-lg font-bold">Guide</h4>
              {guide?.image && (
                <figure className="relative w-32 h-32 overflow-hidden rounded-xl">
                  <Image
                    src={guide?.image}
                    alt={guide?.name}
                    sizes="100%"
                    fill
                    priority
                    className="object-cover"
                  />
                </figure>
              )}
              <div>
                <h4 className="text-md font-semibold">Name:</h4>
                <p>{guide?.name || '-'}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Language:</h4>
                <p>{guide?.languages.join(', ') || '-'}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Location:</h4>
                <p>
                  {guide?.location.city || '-'}, {guide?.location.country || '-'}
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Price:</h4>
                <p>
                  {numberToRupiah(guide?.pricePerDay || 0)} x {totalDays} day(s) ={' '}
                  {numberToRupiah((guide?.pricePerDay || 0) * totalDays)}
                </p>
              </div>
            </div>

            <div className="border-2 p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-lg font-bold">Summary</h4>
              <div>
                <h4 className="text-md font-semibold">Total Guests:</h4>
                <p>{totalGuests}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Total Days:</h4>
                <p>{totalDays}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold">Total Price:</h4>
                <p>{numberToRupiah(totalPrice)}</p>
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

export default PackageCard;
