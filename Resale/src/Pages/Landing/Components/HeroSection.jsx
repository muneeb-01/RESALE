import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  // Animation variants for heading, paragraph, and button
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex cursor-default flex-col items-center text-center py-12 sm:py-16 lg:py-20 max-w-5xl mx-auto">
        <motion.h1
          className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Cloth Cycle
          <span className="bg-gradient-to-r from-green-500 to-teal-800 text-transparent bg-clip-text">
            {" "}
            Buy & Sell Used Fashion
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 sm:mt-8 lg:mt-10 text-base sm:text-lg md:text-xl text-neutral-500 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Discover sustainable fashion with Cycle Clothes! Buy or sell gently
          used clothes, reduce waste, and refresh your wardrobe with unique
          finds. Start today and join the eco-friendly fashion movement!
        </motion.p>
        <motion.div
          className="flex justify-center mt-8 sm:mt-10 lg:mt-12"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/signup"
            className="bg-gradient-to-r from-green-500 to-teal-800 text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-md hover:shadow-lg transition-shadow"
            whileHover="hover"
            variants={buttonVariants}
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default HeroSection;
