import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { href: "https://twitter.com/clothcycle", text: "Twitter" },
    { href: "https://instagram.com/clothcycle", text: "Instagram" },
    { href: "https://facebook.com/clothcycle", text: "Facebook" },
  ];

  return (
    <footer className="mt-12 border-t py-6 border-neutral-700 section text-neutral-200">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Brand Name */}
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            Cloth Cycle
          </h2>

          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="hover:text-green-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-neutral-400 text-center">
            &copy; {new Date().getFullYear()} Cloth Cycle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
