import React, { useEffect } from "react";
import story1 from '../../assets/about/stry.jpg'
import AOS from "aos";
import "aos/dist/aos.css";

const OurStory = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-white text-green-900 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div data-aos="fade-right">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            We build connected, climate-smart farming systems that give farmers access to quality inputs, expert guidance, and reliable markets, enabling them to increase productivity, earn more, and build resilient livelihoods.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Founded on 27 May 2020, Eagle Park Innovations Limited (EPI) is an agribusiness entity promoting sustainability and inclusive growth across Ghana’s agricultural sector. We also run a poultry farm that provides a reliable market for farmers’ grains while converting poultry waste into compost, closing the loop and strengthening our circular approach to agriculture. We operate across the Northern and Ashanti Regions and partner with distributors to connect farmers nationwide to inputs, services, and markets. Grounded in rural realities, our solutions enable clients and farming households to unlock their potential, increase productivity, build resilience, and strengthen food security.
          </p>
          <p className="text-lg text-gray-600 mt-6 leading-relaxed">
            At EPI, we believe in more than one-off transactions. We build genuine, lasting partnerships with our clients to strengthen communities, protect the environment, and create sustainable livelihoods. Farming, to us, is more than a livelihood; it is a journey towards dignity, equity, and national transformation, requiring sustained collaboration, innovation, and investment.
          </p>
        </div>

        {/* Image */}
        <div data-aos="fade-left">
          <img
            src={story1}
            alt="Farm story"
            className="rounded-tl-[40px] rounded-br-[40px] shadow-lg h-[450px] w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default OurStory;
