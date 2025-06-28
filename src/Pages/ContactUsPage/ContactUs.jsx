import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bgimg from "../ContactUsPage/bgimg.JPG"

const ContactUsPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 px-6 md:px-16"
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      {/* White overlay for readability */}
      <div className="absolute inset-0 bg-[#0212107e]"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text and Info Section */}
        <div data-aos="fade-right">
          <h2 className="text-4xl font-extrabold text-white mb-4">Contact Us</h2>
          <p className="text-white text-lg mb-6">
            Got a question, want to register for a class, or collaborate with us? Reach out—we’d love to hear from you!
          </p>

          <ul className="text-white space-y-4 text-sm">
            <li>
              <i className="ri-map-pin-line mr-2 text-[#002920]"></i> 123 Farm Road, Accra, Ghana
            </li>
            <li>
              <i className="ri-phone-line mr-2 text-[#002920]"></i> +233 20 000 0000
            </li>
            <li>
              <i className="ri-mail-line mr-2 text-[#002920]"></i> info@agrofuture.com
            </li>
          </ul>
        </div>

        {/* Form Section */}
        <div data-aos="fade-left">
          <form className="bg-[#f4f4f4] p-6 md:p-8 rounded-xl shadow-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#002920] mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-[#002920] rounded focus:outline-none focus:ring-2 focus:ring-[#002920]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#002920] mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-[#002920] rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-900 mb-1">Reason for Contact</label>
              <select className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700">
                <option value="class">Class Registration</option>
                <option value="inquiry">General Inquiry</option>
                <option value="collab">Partnership or Collaboration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-900 mb-1">Your Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-3 rounded hover:bg-green-900 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
