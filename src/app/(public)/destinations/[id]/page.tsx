import { API_URL } from "@/constants/url";

import { numberToRupiah } from "@/utils/currency";
import DestinationGallery from "@/components/DestinationGallery";
import DestinationPackages from "@/components/DestinationPackages";
import Maps from "@/components/Maps";

import type { Destination } from "@/types/destination";

const fetchDestinationById = async (
  id: string
): Promise<Destination | null> => {
  const response = await fetch(`${API_URL}/destinations/${id}`, {
    cache: "no-store",
  });
  const data = await response.json();

  return data.data || null;
};

const DestinationDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const destination = await fetchDestinationById(params.id);

  if (!destination) {
    return (
      <section>
        <h1>Destination not found</h1>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-4 lg:px-10">
        <h1 className="text-2xl md:text-3xl font-bold pt-5 pl-7">
          {destination.name}
        </h1>

        <div className="flex flex-col gap-4 md:flex-row mb-4">
          <DestinationGallery
            name={destination.name}
            images={destination.images}
          />

          <article className="flex flex-col gap-4 p-5">
            <div>
              <h4 className="text-lg md:text-xl font-bold">Description</h4>
              <p className="md:text-lg">{destination.description}</p>
            </div>

            <div>
              <h4 className="text-lg md:text-xl font-bold">Location</h4>
              <p className="md:text-lg">
                {destination.location.city}, {destination.location.country}
              </p>
            </div>

            <div>
              <h4 className="text-lg md:text-xl font-bold">Price</h4>
              <p className="md:text-lg">{numberToRupiah(destination.price)}</p>
            </div>
          </article>
        </div>
      </section>

      {destination.location.coordinates?.length === 2 && (
        <section className="flex flex-col gap-4 p-5">
          <Maps coordinates={destination.location.coordinates} />
        </section>
      )}

      <section className="flex flex-col gap-4 p-5">
        <DestinationPackages destinationId={destination._id} />
      </section>
    </>
  );
};

export default DestinationDetailPage;
