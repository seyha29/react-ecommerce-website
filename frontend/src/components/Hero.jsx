import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center border border-gray-400 w-full text-center sm:text-left">
      {/* Left Section: Text */}
      <div className="w-full sm:w-1/2 flex flex-col items-center py-10 sm:py-0">
        <div className="text-[#414141] flex flex-col items-center space-y-4">
          {/* "OUR BESTSELLERS" Section */}
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="w-8 sm:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base tracking-wide">OUR BESTSELLERS</p>
          </div>
          
          {/* "Latest Arrival" Section */}
          <h1 className="prata-regular text-4xl sm:py-3 lg:text-5xl font-bold leading-tight tracking-wide">
            Latest Arrival
          </h1>
          
          {/* "SHOP NOW" Section */}
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="font-semibold text-sm md:text-base tracking-wide">SHOP NOW</p>
            <p className="w-8 sm:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero right side (Image) */}
      <img 
        className="w-full sm:w-1/2 object-cover h-full" 
        src={assets.hero_img} 
        alt="Hero section showcasing the latest arrivals" 
      />
    </div>
  );
};

export default Hero;
