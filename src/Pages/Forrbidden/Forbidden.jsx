import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  return (
    <section className="min-h-screen flex items-center justify-center  px-4">
      <div className="text-center max-w-md bg-white shadow-xl rounded-3xl p-8 border border-green-100">
        <FaBan className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-[#C7E75F] mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#C7E75F] hover:bg-green-600 text-black px-6 py-2 rounded-xl transition"
        >
          Return to Home
        </Link>
      </div>
    </section>
  );
};

export default Forbidden;
