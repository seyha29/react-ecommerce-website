import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductDetail = () => {
  const { id } = useParams();  // Get the product ID from URL
  const { products, addToCart, currency } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const product = products.find((prod) => prod._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Handle adding product to cart with selected size
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product._id, selectedSize);
  };

  return (
    <div className="product-detail-container">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>{currency}{product.price}</p>

      <div>
        <label htmlFor="size">Select Size:</label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">--Choose Size--</option>
          {product.sizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
