import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext); // Access products from context
  const [related, setRelated] = useState([]); // State for related products

  useEffect(() => {
    try {
      if (products.length > 0 && category && subCategory) {
        // Filter products based on category and subCategory
        const filteredProducts = products
          .filter((item) => item.category === category && item.subCategory === subCategory)
          .slice(0, 5); // Limit to 5 products
        setRelated(filteredProducts);
      }
    } catch (error) {
      console.error('Error filtering related products:', error);
    }
  }, [products, category, subCategory]); // Dependencies for filtering

  if (!category || !subCategory) {
    return (
      <p className="text-gray-500 text-center">
        Please select a category and sub-category to view related products.
      </p>
    );
  }

  return (
    <div className="my-24">
      {/* Title Section */}
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      
      {/* Related Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.length > 0 ? (
          related.map((item) => (
            <ProductItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              image={item.image} 
              price={item.price} 
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
