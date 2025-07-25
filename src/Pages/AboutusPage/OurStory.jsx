import React, { useEffect } from "react";
import story1 from '../AboutusPage/stry.jpg'
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
            Eagle Park Innovations Limited (EPI), incorporated on May 27, 2020, is an agribusiness advancing innovation, sustainability, and inclusive growth across Ghana’s agricultural value chain. We operate an integrated model that focuses on certified seeds, poultry, and grain aggregation and market linkages, while supporting farmers and value chain actors with training and technical assistance. Operating in the Northern and Ashanti Regions, we work with a growing network of distributors to deliver quality inputs, services, and fair market access to farmers nationwide.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Grounded in the realities of rural livelihoods, our end-to-end solutions unlock potential, boost productivity, and build resilience to climate and economic challenges. We also strengthen food security and livelihoods by making nutritious, affordable food accessible to all.
            At EPI, we don’t just sell products—we empower. Through our out-grower schemes and training programs, we equip youth, women, and smallholder farmers with skills and dignified livelihoods to thrive in agriculture and uplift their communities. Our gender-responsive, youth-led innovations create lasting social, environmental, and economic impact through strong partnerships.
            Farming, to us, is more than a livelihood—it’s a journey to dignity, equity, and national transformation.


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
