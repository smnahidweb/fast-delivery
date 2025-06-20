import React from 'react';
import bannerImage from '../../../assets/location-merchant.png'
const MerchentBanner = () => {
    return (
        <div>
              <section className="bg-[#03373D] dark:bg-gray-900 py-16 rounded-2xl mb-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left pl-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white leading-tight mb-6">
            Merchant and Customer Satisfaction is <br className="hidden md:block" />
            <span className="text-primary">Our First Priority</span>
          </h1>
          <p className="text-white dark:text-gray-300 mb-8 text-lg max-w-xl mx-auto lg:mx-0">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-green-700 transition duration-300">
              Become a Merchant
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition duration-300">
              Earn with Us
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={bannerImage}
            alt="Courier Delivery"
            className="w-full max-w-md mx-auto lg:mx-0"
          />
        </div>
      </div>
    </section>
        </div>
    );
};

export default MerchentBanner;