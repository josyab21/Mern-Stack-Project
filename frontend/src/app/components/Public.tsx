import { FC } from "react";
import { Link } from "react-router-dom";

const Public: FC = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Welcome to Repair Store!
        </h1>
      </header>
      <main className="max-w-md px-6 py-4 bg-white rounded-lg shadow-lg">
        <p className="text-lg text-gray-800 leading-relaxed">
          Located in Beautiful Downtown Foo City, Repair Store provides a
          trained staff ready to meet your repair needs.
        </p>
        <div className="my-4"></div>
        <address className="text-lg text-gray-800">
          Repair Store
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555" className="text-blue-500">
            (555) 555-5555
          </a>
        </address>
      </main>
      <footer className="mt-8">
        <Link
          to="/login"
          className="text-lg text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
        >
          Employee Login
        </Link>
        <Link
          to="/register"
          className="text-lg text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
        >
          Employee Register
        </Link>
      </footer>
    </section>
  );
};

export default Public;
