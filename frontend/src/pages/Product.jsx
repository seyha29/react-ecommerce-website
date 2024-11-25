import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState('');

  useEffect(() => {
    if (products.length) {
      const product = products.find((item) => item._id === productId);
      setProductData(product || null);
    }
  }, [productId, products]);

  if (!productData) {
    return <div>Loading product details...</div>;
  }

  const { image = [], sizes = [] } = productData;

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {image.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product Thumbnail ${index + 1}`}
                onClick={() => setProductData((prev) => ({ ...prev, selectedImage: item }))}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={productData.selectedImage || image[0] || 'default-image.jpg'}
              alt="Selected Product"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img src={assets.star_icon} alt="Star Icon" className="w-3.5" key={i} />
            ))}
            <img src={assets.star_dull_icon} alt="Star Icon Dull" className="w-3.5" />
            <p className="pl-2">(110)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}{productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-50 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              if (!size) {
                alert("Please select a size before adding to the cart.");
                return;
              }
              addToCart(productData._id, size);
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Review selection */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(120)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website for selling t-shirts is a dedicated platform offering a wide range of stylish and comfortable t-shirts for men, women, and kids. It provides a convenient way for customers to browse and purchase high-quality apparel tailored to different styles, preferences, and sizes.
          </p>
          <p>
            This platform is ideal for fashion-conscious individuals and families looking for trendy and high-quality t-shirts, all from the comfort of their homes.
          </p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
