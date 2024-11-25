import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { products } from '../assets/assets';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const product = useContext(ShopContext); // Assuming you might use this for other context-related tasks
  const [bestSeller, setBestSeller] = useState([]);  // Correctly destructuring useState

  useEffect(() => {
    // Filtering the products array to get the best sellers
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));  // Set the top 5 best sellers
  }, []);  // Empty dependency array to run only once after component mount

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERs'} />
        <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
