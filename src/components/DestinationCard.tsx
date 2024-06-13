const DestinationCard = () => {
  return (
    <>
      <div className="card card-compact w-72 bg-base-100 shadow-xl">
        <picture className="px-2 pt-2">
          <img
            src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2021/02/19/e6f3a24b-78ec-48b7-b4f9-2d07dc6e64c7-1613726781094-564ef32e1e65918426ff6af43913aaf8.jpg"
            alt="Imsge"
            className="rounded-xl"
          />
        </picture>
        <div className="card-body">
          <h2 className="card-title">Labuan Bajo dengan Speed Boat</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
    </>
  );
};

export default DestinationCard;
