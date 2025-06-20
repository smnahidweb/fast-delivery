import React from 'react';
import { BiMessageSquareDetail } from 'react-icons/bi';

const FAQ = () => {
    const faqs = [
  {
    question: 'How long does delivery usually take?',
    answer:
      'Standard deliveries within Bangladesh typically take 1–3 business days depending on the location. Express delivery options are also available.',
  },
  {
    question: 'How can I track my parcel in real-time?',
    answer:
      'You can track your parcel through our live tracking feature. Just use your tracking ID on our website or app to get real-time updates.',
  },
  {
    question: 'Do you offer Cash on Delivery (COD) service?',
    answer:
      'Yes, we offer secure COD services across the country, ensuring that you receive your payments directly after successful delivery.',
  },
  {
    question: 'Is there any weight limit for packages?',
    answer:
      'Yes, we accept packages up to 30kg. For heavier shipments or bulk delivery solutions, please contact our support team.',
  },
  {
    question: 'What happens if my package is damaged or lost?',
    answer:
      'We take every precaution to ensure safe delivery. However, in rare cases of loss or damage, our support team will assist you in filing a claim and resolving the issue promptly.',
  },
];
    return (
         <section className="bg-white dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-10">
         <BiMessageSquareDetail className="text-primary text-6xl mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-primary dark:text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Got a question about our courier service? We’re here to help. Check out some of the most common queries below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-plus bg-gray-100 dark:bg-gray-800 text-left rounded-lg shadow"
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-lg font-semibold text-gray-800 dark:text-white peer-checked:text-primary">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-600 dark:text-gray-300">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    );
};

export default FAQ;