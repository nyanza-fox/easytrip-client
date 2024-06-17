const Banner = () => {
  return (
    <>
      <section className="flex justify-center w-11/12 m-auto py-5">
        <div className="carousel w-4/5">
          <div id="slide1" className="carousel-item relative w-full">
            <picture className="w-full">
              <img
                src="/slide1.jpg"
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
                src="/slide2.jpg"
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
                src="/slide3.jpg"
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
                src="/slide4.jpg"
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
    </>
  );
};

export default Banner;
