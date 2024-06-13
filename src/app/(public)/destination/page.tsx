import DestinationCard from "@/components/DestinationCard";

const DestinationPage = () => {
  return (
    <>
      <section>
        <div className="flex flex-row justify-between pt-10 px-20">
          <h1 className="text-2xl font-bold">Popular Place</h1>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-4 p-5">
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
        </div>
      </section>
    </>
  );
};

export default DestinationPage;
