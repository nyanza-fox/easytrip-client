import { API_URL } from "@/constants/url";

import { numberToRupiah } from "@/utils/currency";
import DestinationGallery from "@/components/DestinationGallery";
import DestinationPackages from "@/components/DestinationPackages";
import type { Destination } from "@/types/destination";
import Maps from "@/components/Maps";

const fetchDestinationById = async (
  id: string
): Promise<Destination | null> => {
  const response = await fetch(`${API_URL}/destinations/${id}`, {
    cache: "no-store",
  });
  const data = await response.json();
  console.log(data?.data?.location?.coordinates, "server");

  return data.data || null;
};

const DestinationDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const destination = await fetchDestinationById(params.id);
  let coordinates: [number, number] = destination?.location?.coordinates as [
    number,
    number
  ];

  if (!destination) {
    return (
      <section>
        <h1>Destination not found</h1>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{destination.name}</h1>

        <div className="flex flex-col gap-4 md:flex-row mb-4">
          <DestinationGallery
            name={destination.name}
            images={destination.images}
          />

          <article className="flex flex-col gap-4">
            <div>
              <h4 className="text-md font-bold">Description</h4>
              <p>{destination.description}</p>
            </div>

            <div>
              <h4 className="text-md font-bold">Location</h4>
              <p>
                {destination.location.city}, {destination.location.country}
              </p>
            </div>

            <div>
              <h4 className="text-md font-bold">Price</h4>
              <p>{numberToRupiah(destination.price)}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <DestinationPackages destinationId={destination._id} />
      </section>
      <section className="flex flex-col gap-4">
        <div className="m-4">
          <h1 className="text-3xl font-bold">Location</h1>
          <Maps coordinates={coordinates} />
        </div>
      </section>
    </>
  );
};

export default DestinationDetailPage;
