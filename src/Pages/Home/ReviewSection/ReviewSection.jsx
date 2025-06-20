import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { FaQuoteLeft } from 'react-icons/fa';

import reviewImage from '../../../assets/customer-top.png';
import quote from '../../../assets/reviewQuote.png';

const reviews = [
  {
    id: 1,
    text: "This courier service is a lifesaver for my online business. Fast, reliable, and affordable!",
    name: "Ayesha Rahman",
    role: "Small Business Owner",
  },
  {
    id: 2,
    text: "Super easy to book and track deliveries. Great support team too!",
    name: "Kazi Imran",
    role: "E-commerce Vendor",
  },
  {
    id: 3,
    text: "Their COD process is smooth and I get paid on time. Highly recommended!",
    name: "Rafiul Hasan",
    role: "Shopify Seller",
  },
  {
    id: 4,
    text: "My parcels are always delivered safely, even in remote areas. Great coverage!",
    name: "Nusrat Jahan",
    role: "Merchant Partner",
  },
  {
    id: 5,
    text: "Affordable pricing and fast pickup service. My customers are happy too.",
    name: "Arif Chowdhury",
    role: "Retailer",
  },
  {
    id: 6,
    text: "I’ve been using their SME service—super professional and very organized.",
    name: "Farzana Akter",
    role: "Corporate Client",
  },
  {
    id: 7,
    text: "Reliable courier with top-notch tracking. I never worry about my shipments.",
    name: "Tamanna Nasrin",
    role: "Online Reseller",
  },
];

const ReviewSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <img src={reviewImage} alt="Review Header" className="h-20 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-primary dark:text-white mb-4">
          What Our Customers Are Saying
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* Review Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mx-2 h-full flex flex-col justify-between">
             <FaQuoteLeft className='text-primary mb-4'></FaQuoteLeft >
              <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm leading-relaxed">
                "{review.text}"
              </p>

              <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-4" />

              <div className="flex items-center gap-4 mt-auto">
                <div className="avatar">
                  <div className="w-12 h-12 p-3 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                    {review.name.split(' ')[0][0]}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-800 dark:text-white">{review.name}</p>
                  <p className="text-gray-500 dark:text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewSection;
