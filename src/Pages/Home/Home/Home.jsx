import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import BrandsSection from '../BrandsSection';
import Features from '../Features/Features';
import MerchentBanner from '../MerchentBanner/MerchentBanner';
import HowItWorks from '../HowItWorks/HowItWorks';
import ReviewSection from '../ReviewSection/ReviewSection';
import { FaQ } from 'react-icons/fa6';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <HowItWorks></HowItWorks>
          <Services></Services>
          <BrandsSection></BrandsSection>
          <Features></Features>
          <MerchentBanner></MerchentBanner>
          <ReviewSection></ReviewSection>
          <FAQ></FAQ>
        </div>
    );
};

export default Home;