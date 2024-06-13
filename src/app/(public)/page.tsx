import DestinationCard from "@/components/DestinationCard";

const HomePage = () => {
  return (
    <>
      <section className="w-11/12 m-auto py-10">
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <picture className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
                alt="banner1"
                className="w-full rounded-xl"
              />
            </picture>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <picture className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                alt="banner2"
                className="w-full rounded-xl"
              />
            </picture>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <picture className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
                alt="banner3"
                className="w-full rounded-xl"
              />
            </picture>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <picture className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
                alt="banner4"
                className="w-full rounded-xl"
              />
            </picture>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-row justify-between px-20">
          <h1 className="text-2xl font-bold">Popular Place</h1>
          <button className="btn btn-sm">See All &nbsp; ❯</button>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-4 p-5">
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Travel to make sweet memories</h1>
          <p className="text-lg text-zinc-500">
            Find trips that fit a flexible lifestyle
          </p>
        </div>
        <div className="flex flex-row justify-center m-auto w-4/5 pt-4 px-24">
          <div className="flex flex-col gap-5 w-1/2 p-10">
            <div>
              <div className="badge badge-primary badge-md">01</div>
              <h1 className="text-xl font-bold">
                Find trip that fit your freedom
              </h1>
              <p>
                Traveling over freedom and flexibility, solitude, <br />
                spontanelty, privacy, purpose.
              </p>
            </div>
            <div>
              <div className="badge badge-secondary badge-md">02</div>
              <h1 className="text-xl font-bold">
                Get back to nature by travel
              </h1>
              <p>
                The world is a playground and you can finally <br /> explore
                nature&apos;s inimitable canvas.
              </p>
            </div>
            <div>
              <div className="badge badge-accent badge-md">03</div>
              <h1 className="text-xl font-bold">
                Reignite those travel tastebuds
              </h1>
              <p>
                There are infinite reasons to love travel, one of <br /> them
                being the food, glorious food.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center w-1/2 ">
            <picture>
              <img
                src="https://i.pinimg.com/564x/39/d9/2d/39d92ddb13342ed4743828325453d99e.jpg"
                alt="image"
                className="rounded-2xl h-screen"
              />
            </picture>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
