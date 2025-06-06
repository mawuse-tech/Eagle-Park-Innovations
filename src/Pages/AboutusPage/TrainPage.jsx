import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TrainPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-sans text-[#06360b]">
      {/* Hero Section */}
      <section
        className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('your-image.jpg')" }} // <-- Insert your image path here
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="relative z-10 text-center px-4 md:px-12" data-aos="fade-down">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Empowering Farmers<br />Through Expert Training
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Join thousands of farmers gaining skills in modern, sustainable, and profitable agriculture.
          </p>
          <button className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full shadow-lg transition-all">
            Join Our Next Training <i className="ri-arrow-right-line ml-2"></i>
          </button>
        </div>
      </section>

      {/* Training Overview */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">What We Offer</h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Our comprehensive training programs are designed to help farmers thrive in a changing world.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3" data-aos="fade-up">
          <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <i className="ri-seedling-fill text-3xl text-green-700 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Organic Farming</h3>
            <p className="text-sm text-gray-700">
              Learn the best practices in chemical-free farming to preserve soil and health.
            </p>
          </div>

          <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <i className="ri-plant-line text-3xl text-green-700 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Crop Rotation</h3>
            <p className="text-sm text-gray-700">
              Maximize yield with smart planting strategies and climate-adaptive practices.
            </p>
          </div>

          <div className="bg-[#f3fdf5] p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <i className="ri-tools-fill text-3xl text-green-700 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Modern Tools</h3>
            <p className="text-sm text-gray-700">
              Get hands-on training with irrigation systems, greenhouses, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#06360b] text-white py-16 px-6 md:px-20" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Farming Skills?</h2>
          <p className="mb-6 text-gray-200">
            Be part of a network of knowledgeable, empowered farmers transforming agriculture across the region.
          </p>
          <button className="bg-amber-400 text-black px-6 py-3 rounded-full hover:bg-amber-500 transition">
            Register Now <i className="ri-user-add-line ml-2"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default TrainPage;
