import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate

const PlaceOrder = () => {
  const { currency, delivery_fee, getCartAmount, placeOrder } = useContext(ShopContext);
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zipcode: '',
    state: '',
    country: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [method, setMethod] = useState(''); // Payment method state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!method) {
      alert("Please select a payment method.");
      return;
    }
    setIsSubmitting(true);

    try {
      // Here, you would place the order and handle submission logic
      await placeOrder(formData, getCartAmount(), delivery_fee, method); // Pass payment method

      // Redirect to the "Order" page after successful submission
      navigate('/order'); // Replace '/order' with the correct path for the order confirmation page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an issue placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getCartAmount();
  const total = subtotal + (subtotal > 0 ? delivery_fee : 0);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-10 min-h-[80vh]">
      {/* Left Side: Delivery Information Form */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[480px] px-4 py-6 bg-white rounded-lg shadow-md">
        <div className="text-xl sm:text-2xl my-3 font-bold">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* First Name and Last Name */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Street Address */}
        <div className="mb-4">
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* City, Zipcode, and State */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full sm:w-1/3">
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full sm:w-1/3">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Country Field */}
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Right Side: Cart Totals and Payment Methods */}
      <div className="flex-1 sm:max-w-[480px]">
        <CartTotal />

        {/* Payment Method Section Styled Like Cart Totals */}
        <div className="mt-6 px-6 py-5 bg-white rounded-lg shadow-md">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe Option */}
            <div
              onClick={() => setMethod('stripe')}
              className="flex items-center gap-3 border p-2 px-4 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}
              >
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe logo" />
              </p>
            </div>

            {/* Razorpay Option */}
            <div
              onClick={() => setMethod('razorpay')}
              className="flex items-center gap-3 border p-2 px-4 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}
              >
                <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay logo" />
              </p>
            </div>

            {/* Cash On Delivery Option */}
            <div
              onClick={() => setMethod('cod')}
              className="flex items-center gap-3 border p-2 px-4 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}
              >
                {/* You can use an icon or logo for COD here */}
              </p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={()=>navigate('/Orders')}className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
