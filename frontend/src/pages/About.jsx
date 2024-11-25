import React from 'react';
import Title from '../components/Title'; // Ensure the Title component is properly imported
import { assets } from '../assets/assets'; // Correct import for images from assets
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className="text-2xl text-center pt-8 border-t">
      {/* Title component */}
      <Title text1="ABOUT" text2="US" />

      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* Image Section */}
        <div className="w-full md:max-w-[450px]">
          <img
            src={assets.about_img} // Imported image path
            alt="About Us"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 font-medium">
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online.
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that meet
            the ever-evolving needs of our customers.
          </p>

          <div>
            <strong className="text-gray-800">Our Mission</strong>
            <p>
              Our mission at Forever is to empower customers with choice, convenience, and a seamless shopping experience.
              We are committed to providing the best products at competitive prices, while ensuring that our customers have
              access to exceptional service.
            </p>
          </div>
        </div>
      </div>

      {/* Section: Why Choose Us */}
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
        <div className="flex flex-col md:flex-row text-sm mb-20">
          {/* Quality Assurance Section */}
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <strong>Quality Assurance:</strong>
            <p>
              We meticulously select and vet each product to ensure it meets our stringent quality standards, giving our customers confidence in every purchase.
            </p>
          </div>

          {/* Convenience Section */}
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <strong>Convenience:</strong>
            <p>
              With our user-friendly interface and hassle-free ordering process, shopping with us is quick, easy, and enjoyable.
            </p>
          </div>

          {/* Customer Service Section */}
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <strong>Customer Service:</strong>
            <p>
              Our dedicated support team is always ready to assist you, ensuring that your experience with us is smooth from start to finish.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Box Component */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
