import DestinationCard from "@/components/DestinationCard";

const DestinationPage = () => {
  return (
    <>
      <section>
        <div className="flex flex-row justify-between pt-10 px-20">
          <h1 className="text-2xl font-bold">Choose your destination</h1>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-4 p-5">
          {/* <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard /> */}
        </div>
        <div className="join flex justify-center items-center">
          <button className="join-item btn">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
      </section>
    </>
  );
};

export default DestinationPage;
