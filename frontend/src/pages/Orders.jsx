import React, { useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext'; // Import context

const Orders = () => {
  const { products, currency } = useContext(ShopContext); // Use the context here

  return (
    <div className='border-t pt-6'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'Orders'} />
      </div>
      <div>
        {products.slice(0, 4).map((item, index) => (
          <div key={index} className="py-4 border-t border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Adjust the image size */}
              <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover" />
              <div>
                {/* Apply font-medium for product name */}
                <p className="text-lg font-medium">{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-sm text-gray-700'>
                  {/* Apply font-medium for price */}
                  <p className="text-lg font-medium">{currency}{item.price.toFixed(2)}</p>
                  <p className="font-medium">Quantity: 1</p>
                  <p className="font-medium">Size: M</p>
                </div>
                <p className='mt-2 text-sm'>
                  Date: <span className='text-gray-400'>25, July, 2024</span>
                </p>
              </div>
            </div>
            {/* Status Section */}
            <div className='w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>Ready to ship</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium  rounded-sm">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
