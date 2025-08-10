import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Selling my old clothes on this platform was so easy! The 5% commission on the Free plan is fair, and I love contributing to sustainable fashion.",
      user: "Ayesha Khan",
      company: "Lahore, PK",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      text: "The Standard plan's 2% commission is a game-changer. I listed 30 items in a week, and the dashboard made tracking sales a breeze!",
      user: "Hassan Malik",
      company: "Karachi, PK",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      text: "I upgraded to Premium for zero commission, and it’s worth every penny. Unlimited listings and great support make selling clothes effortless.",
      user: "Sana Iqbal",
      company: "Islamabad, PK",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
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

  // Animation variants for testimonial cards
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
    <div className="mt-20 tracking-wide">
      <motion.div
        className="text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headerVariants}
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
          What People Are Saying
        </h2>
      </motion.div>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={index}
          >
            <div className="bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin">
              <p>{testimonial.text}</p>
              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src={testimonial.image}
                  alt={testimonial.user}
                />
                <div>
                  <h6>{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-neutral-600">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
