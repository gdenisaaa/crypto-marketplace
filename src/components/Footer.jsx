import React from "react";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white py-6">
      <p className="text-center text-sm md:text-base">
        Denisa Greceanu - Personal project &copy; {new Date().getFullYear()} All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
