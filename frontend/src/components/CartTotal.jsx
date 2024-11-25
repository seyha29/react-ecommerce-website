import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount(); // Get the subtotal from the context
  const total = subtotal + (subtotal > 0 ? delivery_fee : 0); // If there's a subtotal, add the delivery fee

  return (
    <div className="w-full">
      {/* Title "CART TOTALS" aligned to the right */}
      <div className="text-2xl text-left">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Align the text content to the right */}
        <div className="flex justify-between text-right">
          <p>Subtotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between text-right">
          <p>Shipping fee</p>
          <p>{currency}{subtotal > 0 ? delivery_fee.toFixed(2) : '0.00'}</p>
        </div>
        <hr />
        <div className="flex justify-between text-right">
          <b>Totals</b>
          <b>{currency}{total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
