import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
  return (
    <section className="flex justify-center max-w-screen-xl p-4 mx-auto">
      <div className="w-full carousel">
        <div id="slide1" className="relative w-full carousel-item">
          <figure className="relative w-full overflow-hidden h-96 rounded-xl">
            <Image
              src="/slide1.jpg"
              alt="banner1"
              sizes="100%"
              fill
              priority
              className="object-cover"
            />
          </figure>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <Link href="#slide4" className="btn btn-circle">
              ❮
            </Link>
            <Link href="#slide2" className="btn btn-circle">
              ❯
            </Link>
          </div>
        </div>

        <div id="slide2" className="relative w-full carousel-item">
          <figure className="relative w-full overflow-hidden h-96 rounded-xl">
            <Image
              src="/slide2.jpg"
              alt="banner2"
              sizes="100%"
              fill
              priority
              className="object-cover"
            />
          </figure>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <Link href="#slide1" className="btn btn-circle">
              ❮
            </Link>
            <Link href="#slide3" className="btn btn-circle">
              ❯
            </Link>
          </div>
        </div>

        <div id="slide3" className="relative w-full carousel-item">
          <figure className="relative w-full overflow-hidden h-96 rounded-xl">
            <Image
              src="/slide3.jpg"
              alt="banner3"
              sizes="100%"
              fill
              priority
              className="object-cover"
            />
          </figure>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <Link href="#slide2" className="btn btn-circle">
              ❮
            </Link>
            <Link href="#slide4" className="btn btn-circle">
              ❯
            </Link>
          </div>
        </div>

        <div id="slide4" className="relative w-full carousel-item">
          <figure className="relative w-full overflow-hidden h-96 rounded-xl">
            <Image
              src="/slide4.jpg"
              alt="banner4"
              sizes="100%"
              fill
              priority
              className="object-cover"
            />
          </figure>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <Link href="#slide3" className="btn btn-circle">
              ❮
            </Link>
            <Link href="#slide1" className="btn btn-circle">
              ❯
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
