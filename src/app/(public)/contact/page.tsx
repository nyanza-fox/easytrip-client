import Link from "next/link";

const ContactPage = () => {
  return (
    <>
      <section className="flex flex-col justify-center text-center bg-primary h-60">
        <h1 className="text-2xl lg:text-4xl font-semibold text-neutral">
          Contact Us
        </h1>
        <p className="text-sm lg:text-lg text-white py-3">
          We would love to hear from you! Contact us for any inquiries or
          feedback.
        </p>
      </section>

      <section className="flex flex-row flex-wrap justify-center gap-5 p-10">
        <Link
          href={"https://github.com/Hascine"}
          className="flex flex-col items-center gap-5 w-48 md:w-72 lg:w-96 p-5 rounded-md shadow-xl bg-transparent hover:bg-sky-100"
        >
          <picture>
            <img
              src="https://avatar.iran.liara.run/public/41"
              alt="contact"
              className="w-24 md:w-40"
            />
          </picture>
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-primary">
            Badzlin Maladzi
          </h1>
        </Link>
        <Link
          href={"https://github.com/akmalhisyammm"}
          className="flex flex-col items-center gap-5 w-48 md:w-72 lg:w-96 p-5 rounded-md shadow-xl bg-transparent hover:bg-sky-100"
        >
          <picture>
            <img
              src="https://avatar.iran.liara.run/public/8"
              alt="contact"
              className="w-24 md:w-40"
            />
          </picture>
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-primary">
            Muhammad Akmal Hisyam
          </h1>
        </Link>
        <Link
          href={"https://github.com/pristiwanakbars"}
          className="flex flex-col items-center gap-5 w-48 md:w-72 lg:w-96 p-5 rounded-md shadow-xl bg-transparent hover:bg-sky-100"
        >
          <picture>
            <img
              src="https://avatar.iran.liara.run/public/5"
              alt="contact"
              className="w-24 md:w-40"
            />
          </picture>
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-primary">
            Pristiwan Akbar Subery
          </h1>
        </Link>
        <Link
          href={"https://github.com/pbalqish"}
          className="flex flex-col items-center gap-5 w-48 md:w-72 lg:w-96 p-5 rounded-md shadow-xl bg-transparent hover:bg-sky-100"
        >
          <picture>
            <img
              src="https://avatar.iran.liara.run/public/69"
              alt="contact"
              className="w-24 md:w-40"
            />
          </picture>
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-primary">
            Putri Balqis Hermayani
          </h1>
        </Link>
        <Link
          href={"https://github.com/simsonhutagaol"}
          className="flex flex-col items-center gap-5 w-48 md:w-72 lg:w-96 p-5 rounded-md shadow-xl bg-transparent hover:bg-sky-100"
        >
          <picture>
            <img
              src="https://avatar.iran.liara.run/public/22"
              alt="contact"
              className="w-24 md:w-40"
            />
          </picture>
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-primary">
            Simson Hamonangan Hutagaol
          </h1>
        </Link>
      </section>
    </>
  );
};

export default ContactPage;

/*
Badzlin Maladzi
Muhammad Akmal Hisyam
Pristiwan Akbar Subery
Putri Balqis Hermayani
Simson Hamonangan Hutagaol
 */
