import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Animation variants for mobile drawer
  const drawerVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  // Animation variants for nav items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <nav className="sticky craftr2 section top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="text-xl font-bold tracking-tight">
              Cloth Cycle
            </Link>
          </div>
          <div className="hidden lg:flex justify-center space-x-8 items-center">
            <Link
              to="/login"
              className="py-2 px-3 border rounded-md hover:border-green-500 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-green-500 to-teal-800 text-white py-2 px-3 rounded-md hover:shadow-lg transition-shadow"
            >
              Create an account
            </Link>
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleNavbar}
              aria-label={mobileDrawerOpen ? "Close menu" : "Open menu"}
            >
              {mobileDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileDrawerOpen && (
            <motion.div
              className="fixed right-0 top-[8vh] z-20 bg-neutral-900 w-full p-6 flex flex-col justify-center items-center lg:hidden"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="flex flex-col space-y-4 mt-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to="/login"
                  className="py-2 px-3 border rounded-md hover:border-green-500 transition-colors"
                  onClick={toggleNavbar}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-3 rounded-md bg-gradient-to-r from-green-500 to-teal-800 text-white hover:shadow-lg transition-shadow"
                  onClick={toggleNavbar}
                >
                  Create an account
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
