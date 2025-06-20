import React from 'react';
import Marquee from 'react-fast-marquee';

// ✅ Import brand logos from assets
import logo1 from '../../assets/brands/logo1.png';
import logo2 from '../../assets/brands/logo2.png';
import logo3 from '../../assets/brands/logo3.png';
import logo4 from '../../assets/brands/logo4.png';
import logo5 from '../../assets/brands/logo5.png';
import logo6 from '../../assets/brands/logo6.png';
import logo7 from '../../assets/brands/logo7.png';

// ✅ Define the brand data array
const brands = [
  { id: 1, logo: logo1 },
  { id: 2, logo: logo2 },
  { id: 3, logo: logo3 },
  { id: 4, logo: logo4 },
  { id: 5, logo: logo5 },
  { id: 6, logo: logo6 },
  { id: 7, logo: logo7 },
];

const BrandSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
          Trusted by 7+ Top Brands
        </h2>

        <Marquee speed={60} pauseOnHover={true} direction="right" gradient={false}>
          {brands.map((brand) => (
            <div key={brand.id} className="mx-4">
              <img
                src={brand.logo}
                alt={`Brand ${brand.id}`}
                className="h-6 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default BrandSection;
