import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartData.length === 0) {
    return (
      <div className="text-center pt-14">
        <p className="text-xl">Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="border pt-14">
      {/* "YOUR CART" Title aligned to the top left */}
      <div className="text-2xl mb-3 text-left">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart items */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-gray-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Delete"
              />
            </div>
          );
        })}
      </div>

      {/* "CART TOTALS" Title aligned to the bottom right */}
      <div className="flex justify-end mt-10">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
        </div>
      </div>

      {/* "PROCEED TO CHECKOUT" Button */}
      <div className="flex justify-end mt-6">
        <button 
          onClick={() => navigate('/place-order')} 
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300"
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
