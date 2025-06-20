import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import BrandsSection from '../BrandsSection';
import Features from '../Features/Features';
import MerchentBanner from '../MerchentBanner/MerchentBanner';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <Services></Services>
          <BrandsSection></BrandsSection>
          <Features></Features>
          <MerchentBanner></MerchentBanner>
        </div>
    );
};

export default Home;