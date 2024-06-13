const AboutPage = () => {
  return (
    <>
      <section className="flex min-h-screen bg-primary">
        <div className="flex items-center text-left w-1/2 px-20">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white">Hello there!</h1>
            <p className="py-6 text-white">
              Welcome to <span className="text-accent font-bold">EasyTrip</span>
              , your travel guide to exploring the world! We are dedicated to
              providing you with the latest and most reliable information about
              the best destinations, and unique experiences from all around the
              globe.
            </p>
            <button className="btn btn-accent">Get Started</button>
          </div>
        </div>
        <div className="w-1/2"></div>
      </section>

      <section className="p-10">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold py-7">Get to know about us..</h1>
        </div>
        <div className="flex flex-col gap-5 mx-20">
          <div className="flex flex-row gap-2 justify-center">
            <p className="flex justify-center items-center text-lg w-1/2 h-60">
              We believe that every journey is an adventure worth sharing.
              Therefore, we are committed to helping you plan your dream
              vacation by offering recommendations for attractions,
              accommodations, and exciting activities.
            </p>
            <picture className="flex justify-center items-center w-1/2">
              <img
                src="https://i.pinimg.com/564x/cc/1e/55/cc1e5527d2b854ad51f79e56fa9115b9.jpg"
                alt="image"
                className="w-80 rounded-3xl"
              />
            </picture>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <picture className="flex justify-center items-center w-1/2">
              <img
                src="https://i.pinimg.com/564x/cc/1e/55/cc1e5527d2b854ad51f79e56fa9115b9.jpg"
                alt="image"
                className="w-80 rounded-3xl"
              />
            </picture>
            <p className="flex justify-center items-center text-lg w-1/2 h-60">
              At EasyTrip, we understand that every traveler has different needs
              and desires. One of our standout features is the ability to
              generate destination recommendations along with travel packages
              tailored to your preferences using AI technology.
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <p className="flex justify-center items-center text-lg w-1/2 h-60">
              With just a few clicks, our AI-powered system can provide you with
              suggestions for destinations that match your interests, budget,
              and travel duration. Each travel package includes detailed
              itineraries, and accommodation options making it easier and more
              enjoyable for you to plan your trip.
            </p>
            <picture className="flex justify-center items-center w-1/2">
              <img
                src="https://i.pinimg.com/564x/cc/1e/55/cc1e5527d2b854ad51f79e56fa9115b9.jpg"
                alt="image"
                className="w-80 rounded-3xl"
              />
            </picture>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

/*

---

**About Us**

Welcome to [Website Name], your travel guide to exploring the world! We are dedicated to providing you with the latest and most reliable information about the best destinations, travel tips, and unique experiences from all around the globe.

We believe that every journey is an adventure worth sharing. Therefore, we are committed to helping you plan your dream vacation by offering recommendations for attractions, restaurants, accommodations, and exciting activities.

At [Website Name], we understand that every traveler has different needs and desires. That’s why we offer a variety of articles covering everything from backpacking trips to luxury vacations. We also provide practical tips on how to travel safely and comfortably, as well as inspiring stories from travelers worldwide.

**Featured Service**

One of our standout features is the ability to **generate destination recommendations** along with **travel packages** tailored to your preferences using **AI technology**. With just a few clicks, our AI-powered system can provide you with suggestions for destinations that match your interests, budget, and travel duration. Each travel package includes detailed itineraries, accommodation options, and restaurant recommendations, making it easier and more enjoyable for you to plan your trip.

Thank you for visiting [Website Name]. We hope this site becomes a source of inspiration and a useful guide for your next journey. Explore the world with us and discover wonders at every turn!

Happy travels!

---

 */
