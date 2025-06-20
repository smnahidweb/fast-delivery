import React from 'react';
import trackingImg from '../../../assets/Illustration.png';
import safeImg from '../../../assets/safe-delivery.png';
import supportImg from '../../../assets/safe-delivery.png';

const features = [
  {
    id: 1,
    title: 'Live Parcel Tracking',
    description:
      'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment\'s journey and get instant status updates for complete peace of mind.',
    image: trackingImg,
  },
  {
    id: 2,
    title: '100% Safe Delivery',
    description:
      'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    image: safeImg,
  },
  {
    id: 3,
    title: '24/7 Call Center Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    image: supportImg,
  },
];

const Features = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4">
         <h2 className="text-4xl font-extrabold text-green-600 text-center mb-12">Why You Choose</h2>
      <div className="max-w-6xl mx-auto grid gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Left Side Image */}
            <div className="flex-shrink-0">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* Vertical Divider */}
            <div className="mx-6 h-20 border-l-2 border-dashed border-gray-400 dark:border-gray-600" />

            {/* Right Side Text */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
