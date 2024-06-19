const AboutPage = () => {
  return (
    <>
      <section className="flex h-80 bg-primary md:px-10 lg:px-28">
        <div className="flex flex-col justify-center text-left md:w-1/2 p-10">
          <h1 className="text-2xl lg:text-4xl font-semibold text-neutral">
            Welcome to <span className="font-bold">EasyTrip</span>!
          </h1>
          <p className="text-sm lg:text-lg text-white py-3">
            Explore the world effortlessly through our travel guide website,
            which uses advanced AI technology to provide personalized
            recommendations tailored to your preferences, including dream
            destinations and the best travel packages.
          </p>
        </div>
        <picture className="hidden md:flex items-center w-1/2">
          <img
            src="/easytrip-logo.png"
            alt="image"
            className="w-60 rounded-3xl mx-auto"
          />
        </picture>
      </section>

      <section className="p-5">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold py-8">
            Get to know about us
          </h1>
        </div>
        <div className="flex flex-col gap-10 md:gap-1 mx-5 lg:mx-44">
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <picture className="flex justify-center items-center md:w-1/2">
              <img src="/icon1.jpg" alt="image" className="w-36 md:w-44" />
            </picture>
            <p className="text-sm md:text-base lg:text-lg text-left text-balance text-slate-600 my-auto md:w-1/2">
              <span className="font-semibold">EasyTrip</span> is your travel
              guide to exploring the world! We are dedicated to providing you
              with the latest and most reliable information about the best
              destinations, and unique experiences from all around the globe. We
              believe that every journey is an adventure worth sharing.
            </p>
          </div>
          <div className="flex flex-col md:flex-row-reverse gap-2 justify-center">
            <picture className="flex justify-center items-center md:w-1/2">
              <img src="/icon2.jpg" alt="image" className="w-36 md:w-44" />
            </picture>
            <p className="text-sm md:text-base lg:text-lg text-left text-balance text-slate-600 my-auto md:w-1/2">
              At <span className="font-semibold">EasyTrip</span>, we understand
              that every traveler has different needs and desires. One of our
              standout features is the ability to generate destination
              recommendations along with travel packages tailored to your
              preferences using AI technology.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <picture className="flex justify-center items-center md:w-1/2">
              <img src="/icon3.jpg" alt="image" className="w-36 md:w-44" />
            </picture>
            <p className="text-sm md:text-base lg:text-lg text-left text-balance text-slate-600 my-auto md:w-1/2">
              With just a few clicks, our AI-powered system can provide you with
              suggestions for destinations that match your interests, budget,
              and travel duration. Each travel package includes detailed
              itineraries, and accommodation options making it easier and more
              enjoyable for you to plan your trip.
            </p>
          </div>
        </div>
        <div className="divider divider-primary py-7"></div>
        <div className="flex flex-col text-center px-10">
          <p className="text-base lg:text-xl text-balance text-slate-600">
            Thank you for visiting EasyTrip. We hope this site becomes a source
            of inspiration and a useful guide for your next journey. Explore the
            world with us and discover wonders at every turn!
          </p>
          <h1 className="text-xl lg:text-3xl font-bold text-primary pt-8">
            Happy travels!
          </h1>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
