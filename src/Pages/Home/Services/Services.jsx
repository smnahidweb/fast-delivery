import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";
import ServicesCard from "./ServicesCard";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <FaShippingFast className="text-5xl text-primary" />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <FaMapMarkedAlt className="text-5xl text-primary" />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <FaWarehouse className="text-5xl text-primary" />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <FaMoneyBillWave className="text-5xl text-primary" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <FaBuilding className="text-5xl text-primary" />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <FaUndoAlt className="text-5xl text-primary" />,
  },
];

const Services = () => {
  useEffect(() => {
     AOS.init({
        duration: 2000, // Animation duration
        once: true,     // Whether animation should happen only once
      });
    }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 py-16  rounded-2xl mt-12" data-aos="fade-right" >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-primary">Our Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Fast and secure delivery options designed to support your business needs.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {
            services.map(service => <ServicesCard service = {service} ></ServicesCard>)
        }
      </div>
    </section>
  );
};

export default Services;
