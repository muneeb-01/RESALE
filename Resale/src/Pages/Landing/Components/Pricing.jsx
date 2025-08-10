import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const Pricing = () => {
  const pricingOptions = [
    {
      title: "Free",
      price: "PKR 0",
      features: [
        "5% commission per sale",
        "List up to 10 items",
        "Basic seller dashboard",
        "Standard customer support",
      ],
    },
    {
      title: "Standard",
      price: "PKR 200",
      features: [
        "2% commission per sale",
        "List up to 50 items",
        "Advanced seller dashboard",
        "Priority customer support",
      ],
    },
    {
      title: "Premium",
      price: "PKR 500",
      features: [
        "0% commission per sale",
        "Unlimited item listings",
        "Advanced seller dashboard",
        "Dedicated customer support",
      ],
    },
  ];

  // Animation variants for the header
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for pricing cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="pt-20 pb-20 border-t border-neutral-800">
      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headerVariants}
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
          Pricing
        </h2>
      </motion.div>
      <div className="flex flex-wrap">
        {pricingOptions.map((option, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 p-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={index}
          >
            <div className="p-10 border border-neutral-700 rounded-xl">
              <p className="text-4xl mb-8">
                {option.title}
                {option.title === "Standard" && (
                  <span className="bg-gradient-to-r from-teal-500 to-teal-800 text-transparent bg-clip-text text-xl mb-4 ml-2">
                    (Most Popular)
                  </span>
                )}
              </p>
              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2">{option.price}</span>
                <span className="text-neutral-400 tracking-tight">/Month</span>
              </p>
              <ul>
                {option.features.map((feature, index) => (
                  <li key={index} className="mt-8 flex items-center">
                    <FaCheckCircle className="text-teal-500" />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-teal-900 border border-teal-900 rounded-lg transition duration-200"
              >
                Subscribe
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
