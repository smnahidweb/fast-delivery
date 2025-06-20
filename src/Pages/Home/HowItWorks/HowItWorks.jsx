import React from 'react';
import { PackageSearch, Wallet, MapPin, Building2 } from 'lucide-react'; // Lucide icons

const steps = [
  {
    id: 1,
    title: 'Booking Pick & Drop',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <PackageSearch size={36} className="text-primary" />,
  },
  {
    id: 2,
    title: 'Cash On Delivery',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <Wallet size={36} className="text-primary" />,
  },
  {
    id: 3,
    title: 'Delivery Hub',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <MapPin size={36} className="text-primary" />,
  },
  {
    id: 4,
    title: 'Booking SME & Corporate',
    description: 'From personal packages to business shipments — we deliver on time, every time.',
    icon: <Building2 size={36} className="text-primary" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our streamlined process ensures your parcels get picked up, delivered, and paid for safely and efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition duration-300 hover:bg-[#CAEB66]"
          >
            <div className="flex justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
