import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faWhatsapp, faTwitter } from "@fortawesome/free-brands-svg-icons";

const AyurvedaLandingPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Main Hero Section */}
      <header className="relative bg-green-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight hover:cursor-pointer">
          {Array.from("Welcome to Our Ayurveda Bliss Platform").map((char, index) => (
            <span
              key={index}
              className="inline-block transition-transform duration-300 hover:-translate-y-2"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Discover the ancient science of Ayurveda for a healthier and balanced life.
        </p>
        <a
          href="http://localhost:3001"
          target="_blank"  // Opens the link in a new tab
          rel="noopener noreferrer"  // Improves security
          className="mt-6 inline-block px-6 py-3 bg-green-800 rounded-lg text-white text-lg hover:bg-green-900 transition-all duration-300"
        >
          Try Chatbot
        </a>

      </header>
      {/* Additional Information Section */}
      <section id="additional-information" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-green-800">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Vata Section */}
            <div
              className="relative bg-green-50 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 animate-symbol">
                <span className="text-6xl text-orange-500 animate-bounce">🔥</span>
              </div>
              <div className="content transition-opacity duration-300 opacity-100 hover:opacity-0">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">Vata</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Representing air and space, Vata governs movement in the body. Balanced Vata promotes creativity and vitality, while imbalance may cause anxiety and dryness.
                </p>
              </div>
            </div>

            {/* Pitta Section */}
            <div
              className="relative bg-green-50 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 animate-symbol">
                <span className="text-6xl text-blue-500 animate-bounce">🔵</span>
              </div>
              <div className="content transition-opacity duration-300 opacity-100 hover:opacity-0">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">Pitta</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Pitta, linked with fire and water, manages metabolism and transformation. A balanced Pitta fosters intellect and digestion, while imbalance can lead to irritability and inflammation.
                </p>
              </div>
            </div>

            {/* Kapha Section */}
            <div
              className="relative bg-green-50 p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 animate-symbol">
                <span className="text-6xl text-green-600 animate-bounce">🌱</span>
              </div>
              <div className="content transition-opacity duration-300 opacity-100 hover:opacity-0">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">Kapha</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Composed of earth and water, Kapha ensures stability and strength. Balanced Kapha supports immunity and calmness, but imbalance may result in lethargy or congestion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Contact Us Section */}
      <section id="contact-us" className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg mb-6">
            Have questions about Ayurveda? Our experts are here to guide you on your wellness journey.
          </p>
          <form className="max-w-lg mx-auto">
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-left font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg text-gray-900"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-left font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg text-gray-900"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-left font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-lg text-gray-900"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-800 py-3 rounded-lg text-lg font-bold hover:bg-green-900 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </section>


      {/* Where to Connect Us Section */}
      <section id="connect-us" className="py-20 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-green-800">Where to Connect Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            Stay connected with us through our social platforms to explore the world of Ayurveda.
          </p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://instagram.com/ayurveda"
              className="text-pink-500 hover:text-pink-600 transition-all duration-300"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://facebook.com/ayurveda"
              className="text-blue-700 hover:text-blue-800 transition-all duration-300"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="https://wa.me/yourphonenumber"
              className="text-green-500 hover:text-green-600 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
            <a
              href="https://twitter.com/ayurveda"
              className="text-blue-400 hover:text-blue-500 transition-all duration-300"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
          <div className="mt-8">
            <p className="text-gray-700 text-lg">
              Follow us for daily wellness tips, Ayurvedic remedies, and personalized support.
            </p>
            <p className="text-gray-700 text-lg">
              Join our community and connect with experts to embrace a balanced lifestyle.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AyurvedaLandingPage;
