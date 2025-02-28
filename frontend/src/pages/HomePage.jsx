import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const HomePage = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      {/* Background Image up to About Us Section */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
      ></div>

      {/* Main Content */}
      <div className="relative z-10 text-center py-20 px-6 sm:px-12 text-white">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-green-400 mb-6 transition-all duration-500 ease-in-out transform hover:scale-105">
          Welcome to Ayurveda Bliss
        </h1>
        <p className="text-lg sm:text-xl mb-12 transition-all duration-500 ease-in-out transform hover:scale-105">
          Discover the ancient wisdom of Ayurveda for a healthier, balanced lifestyle.
        </p>

        {/* Get Started Button */}
        <Link to="/register">
          <button className="bg-green-400 text-white py-2 px-6 rounded-lg font-semibold text-xl transition-all duration-500 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </Link>

        {/* About Us Section */}
        <section className="mt-20 mb-20 bg-gray-900">
          <h2 className="text-3xl font-bold text-green-300 mb-6">About Us</h2>
          <p className="text-lg text-gray-200">
            At Ayurveda Bliss, we believe in the power of nature to promote wellness. Our Ayurvedic products are made with natural ingredients to
            help balance the body, mind, and spirit. Discover the benefits of Ayurveda and enhance your life with our products, created with care and
            passion.
          </p>
        </section>

        {/* Locations Where Ayurvedic Products are Exported */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-green-300 mb-6">Our Global Reach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Location 1 */}
            <div className="text-center transition-all duration-500 ease-in-out hover:scale-105">
              <img src='https://tse1.mm.bing.net/th?id=OIP.P5kqTSQPGhW4Sf5cZqLwbAHaEc&pid=Api&P=0&h=180' alt="Japan" className="w-full h-48 object-cover mb-4 rounded-lg shadow-lg" />
              <h3 className="font-bold text-xl text-green-200">Japan</h3>
            </div>

            {/* Location 2 */}
            <div className="text-center transition-all duration-500 ease-in-out hover:scale-105">
              <img src="https://tse4.mm.bing.net/th?id=OIP.1bPVQiUNM3alRKUVzZN5zAHaF1&pid=Api&P=0&h=180" alt="USA" className="w-full h-48 object-cover mb-4 rounded-lg shadow-lg" />
              <h3 className="font-bold text-xl text-green-200">USA</h3>
            </div>

            {/* Location 3 */}
            <div className="text-center transition-all duration-500 ease-in-out hover:scale-105">
              <img src="https://tse3.mm.bing.net/th?id=OIP.MDcrFHdvxmDJfHY_INvluAHaE8&pid=Api&P=0&h=180" alt="UK" className="w-full h-48 object-cover mb-4 rounded-lg shadow-lg" />
              <h3 className="font-bold text-xl text-green-200">UK</h3>
            </div>

            {/* Location 4 */}
            <div className="text-center transition-all duration-500 ease-in-out hover:scale-105">
              <img src="https://tse1.mm.bing.net/th?id=OIP.QKAwVkdAJozjKHCUkCTt4wHaEo&pid=Api&P=0&h=180" alt="Australia" className="w-full h-48 object-cover mb-4 rounded-lg shadow-lg" />
              <h3 className="font-bold text-xl text-green-200">Australia</h3>
            </div>
          </div>
        </section>

        {/* Testimonials/Responses Section */}
        <section className="bg-gray-800 text-white py-16 px-6 sm:px-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-green-300 mb-6">What Experts Say</h2>
          <div className="space-y-8">
            <div className="flex flex-col items-center transition-all duration-500 ease-in-out hover:scale-105">
              <p className="text-xl italic mb-4">"Ayurveda is the science of life, and it has transformed the way we approach wellness."</p>
              <p className="font-bold">Dr. A. Sharma</p>
              <p className="text-gray-400">Ayurvedic Expert, India</p>
            </div>

            <div className="flex flex-col items-center transition-all duration-500 ease-in-out hover:scale-105">
              <p className="text-xl italic mb-4">"Integrating Ayurveda into our lifestyle leads to better mental clarity and emotional balance."</p>
              <p className="font-bold">Dr. R. Patel</p>
              <p className="text-gray-400">Ayurvedic Practitioner, UK</p>
            </div>

            <div className="flex flex-col items-center transition-all duration-500 ease-in-out hover:scale-105">
              <p className="text-xl italic mb-4">"The power of Ayurveda cannot be overstated—it's all-natural and truly healing."</p>
              <p className="font-bold">Dr. S. Gupta</p>
              <p className="text-gray-400">Holistic Wellness Expert, USA</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
