'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductCard from './ProductCard';
const Products = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  //********** GET ALL PRODUCTS **********//
  const getProducts = async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/products');
    setProducts(res.data);
    setIsLoading(false);
  };
  //********** GET ALL CATEGORIRES **********//
  const getCategory = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + '/products/categories'
    );
    setCategory(res.data);
    setIsCategoryLoading(false);
  };
  // ********** GET PRODUCT BY CATEGORY **********//
  const getProductByCategory = async (category: string) => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/products/category/${category}`
    );
    setProducts(res.data);
    setIsLoading(false);
  };
  //********** GET PRODUCT BY CATEGORY **********//
  const handleCategoryChange = (e: any) => {
    if (e.target.value === '') {
      getProducts();
    } else {
      getProductByCategory(e.target.value);
    }
  };
  //********** USE EFFECT **********//
  useEffect(() => {
    getCategory();
    getProducts();
  }, []);
  //********** GET ALL CATEGORIRES **********//
  let renderCategory = null;
  if (!isCategoryLoading && category) {
    renderCategory = category.map((category: any) => {
      return (
        <option value={category} key={category}>
          {category}
        </option>
      );
    });
  }
  //********** RENDER ALL PRODUCTS **********//
  let renderProduct = null;
  if (!isLoading && products) {
    renderProduct = products.map((product: any) => {
      return (
        <ProductCard
          category={product.category}
          description={product.description}
          price={product.price}
          image={product.image}
          key={product.id}
          id={product.id}
          title={product.title}
          rating={product.rating}
        />
      );
    });
  }
  return (
    <div className='container mt-5'>
      <select
        onChange={handleCategoryChange}
        className='select select-bordered w-full mb-4'
      >
        <option value=''>All Categories</option>
        {renderCategory}
      </select>
      <h1 className='text-2xl font-bold mb-5'>All Products</h1>
      {isLoading ? (
        <div className='text-center mt-20'>
          <h1 className='uppercase text-4xl font-bold'>
            <span className='loading loading-spinner'></span>
          </h1>
        </div>
      ) : (
        <div className='grid grid-cols-3 gap-4'>{renderProduct}</div>
      )}
    </div>
  );
};

export default Products;
