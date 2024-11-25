import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Access ShopContext
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart } = useContext(ShopContext); // Get currency and addToCart from context

  // Handle Add to Cart action
  const handleAddToCart = () => {
    const product = { id, image, name, price }; // Prepare the product to be added
    addToCart(product); // Call addToCart from ShopContext
  };

  return (
    <div className="text-gray-700 cursor-pointer">
      <Link to={`/product/${id}`} className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image.length ? image[0] : 'path/to/default-image.jpg'}
          alt={name}
        />
      </Link>
      <p className="pt-1 pb-3 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}{price || 'Price Unavailable'}
      </p>
      
      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart} 
        className="mt-2 py-1 px-4 bg-blue-500 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
