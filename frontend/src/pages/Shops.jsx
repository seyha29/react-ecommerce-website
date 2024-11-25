import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';  
import { useNavigate } from 'react-router-dom';  
import { assets } from '../assets/assets';

const Shops = () => {
  const { addToCart, currency } = useContext(ShopContext); 
  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       
  const [size, setSize] = useState('');  // State to store the selected size
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();  
  }, []);  

  const handleAddToCart = (product, size) => {
    if (size) {
      addToCart({ ...product, selectedSize: size });
      navigate('/cart');
    } else {
      alert('Please select a size');
    }
  };

  const handleImageError = (e) => {
    e.target.src = assets.fallbackImage;
  };

  if (loading) return <p>Loading...</p>;  
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Shops</h1>
      <ul className="space-y-6">
        {products.map((product) => (
          <li key={product.id} className="border-b py-4">
            <div className="flex gap-4 items-start">
              <img
                src={product.image}
                alt={product.title}
                onError={handleImageError}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <p className="font-bold text-xl mt-2">{currency}{product.price}</p>
                
                {/* Size Selector */}
                <div className="mt-5">
                  <label htmlFor="size" className="block text-lg font-medium">Select Size</label>
                  <select
                    id="size"
                    value={size}
                    className="mt-2 p-2 border rounded-md"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="">-- Select Size --</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">Extra Large</option>
                  </select>
                </div>

                <button
                  onClick={() => handleAddToCart(product, size)}
                  className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shops;
