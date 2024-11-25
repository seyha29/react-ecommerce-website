import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Card(props) {
  const { addToCart, currency } = useContext(ShopContext);

  // Handle Add to Cart functionality
  const handleAddToCart = () => {
    const product = {
      id: props.id, 
      image: props.imageURL, 
      name: props.name, 
      price: props.price,
      selectedSize: props.selectedSize, // Assuming selectedSize is passed
    };
    addToCart(product); // Add product to cart via context
  };

  return (
    <div className="card border-0 mb-5 shadow-md">
      <img 
        src={props.imageURL} 
        className="card-img-top w-full h-64 object-cover" 
        alt={props.name} 
      />
      <div className="card-body">
        <h5 className="card-title font-semibold text-lg">{props.name}</h5>
        <h6 className="text-xl font-bold">{currency}{props.price}</h6> {/* Display price with currency */}
        <p className="card-text text-sm text-gray-600">{props.desc}</p>
        
        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart} 
          className="btn btn-primary mt-2 px-4 py-2 bg-black text-white hover:bg-gray-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
