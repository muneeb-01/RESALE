import { motion } from "framer-motion";

const FeatureSection = () => {
  const features = [
    {
      icon: "👕",
      text: "Sell Your Used Clothes",
      description:
        "Easily list your gently used clothing for sale and give them a new life while earning money.",
    },
    {
      icon: "💸",
      text: "Low 5% Commission",
      description:
        "Keep more of your earnings with our minimal 5% commission fee on every sale.",
    },
    {
      icon: "🌐",
      text: "User-Friendly Platform",
      description:
        "Enjoy a seamless experience with our intuitive interface for listing, selling, and managing your items.",
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

  // Animation variants for feature cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2, // Staggered animation for each card
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="relative pt-20 border-t border-neutral-800 min-h-[800px]">
      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headerVariants}
      >
        <span className="bg-neutral-900 text-teal-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Features
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Sell Your{" "}
          <span className="bg-gradient-to-r from-teal-500 to-teal-800 text-transparent bg-clip-text">
            Wardrobe Sustainably
          </span>
        </h2>
      </motion.div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={index}
          >
            <div className="flex">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-teal-700 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-6 text-xl">{feature.text}</h5>
                <p className="text-md p-2 mb-20 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
