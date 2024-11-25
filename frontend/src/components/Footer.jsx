import React from 'react';
import { assets } from '../assets/assets'; // Or use individual imports if necessary

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
      {/* Logo and description section */}
      <div>
        <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
        <p className="w-full md:w-2/3 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Company Links */}
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      {/* Get in Touch */}
      <div>
        <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+885-883257791</li>
          <li>Contact@forevr2002.com</li>
        </ul>
      </div>

      {/* Footer Bottom with Copyright */}
      <div className="col-span-full">
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024 @ forver.com All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
