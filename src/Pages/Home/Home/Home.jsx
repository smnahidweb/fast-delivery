import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import BrandsSection from '../BrandsSection';
import Features from '../Features/Features';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <Services></Services>
          <BrandsSection></BrandsSection>
          <Features></Features>
        </div>
    );
};

export default Home;