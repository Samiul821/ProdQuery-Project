import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "What is Product Query Platform?",
    answer:
      "It's a community-driven site where users can ask questions about products, get honest answers, and raise awareness about brands to boycott.",
  },
  {
    question: "How do I submit a product query?",
    answer:
      "You can submit a query by creating an account and clicking on the 'Add Query' button from the homepage.",
  },
  {
    question: "Are all brands verified as boycott-worthy?",
    answer:
      "No, users submit queries, but other users can comment, upvote, and discuss the legitimacy. The platform relies on community review.",
  },
  {
    question: "Can I report misleading information?",
    answer:
      "Yes, each query or comment has a 'Report' button. Our team will review and take action accordingly.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-12 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800 font-poppins">Frequently Asked Questions</h2>
        <p className="text-gray-600 mb-12">
          Get answers to common questions about using our platform.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-5 rounded-lg shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center font-medium text-gray-700"
              >
                <span>{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                  <FaChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 text-gray-600"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection;
