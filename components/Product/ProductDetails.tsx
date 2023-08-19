'use client';
import React, { useState, useEffect } from 'react';
import LazyImage from '../UI/LazyImage';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
const ProductDetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const [product, setProduct] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
    rating: 0,
    category: '',
    id: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const getSingleProduct = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/products/${params.id}`
    );
    setIsLoading(false);
    setProduct(res.data);
  };
  useEffect(() => {
    getSingleProduct();
  });
  const handleAddToCart = () => {
    const item = cart.items.find((item: any) => item.id === product.id);
    if (item) {
      if (typeof window !== 'undefined') {
        window.alert('Item already added to cart');
      }
    } else {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          quantity: 1,
          image: product.image,
          total: product.price,
          description: product.description,
          price: product.price,
        })
      );
    }
    if (typeof window !== 'undefined') {
      window.alert('Item added to cart');
    }
  };
  let renderProduct = null;
  if (product) {
    renderProduct = (
      <div className='grid grid-cols-12 gap-10 items-center bg-base-100 shadow-xl p-5'>
        <figure className='product-detail-image col-span-5'>
          <LazyImage
            className='object-contain'
            src={product.image}
            alt='album'
          />
        </figure>
        <div className='flex flex-col gap-6  col-span-7'>
          <div className='card-actions'>
            <div className='badge badge-outline p-3 uppercase'>
              {product.category}
            </div>
          </div>
          <div className='card-actions'>
            <div className=' text-[50px] font-bold  uppercase'>
              $ {product.price}
            </div>
          </div>
          <h2 className='card-title text-4xl font-bold'>{product.title}</h2>
          <p className='text-xl'>{product.description}</p>
          <div className='card-actions'>
            <button className='btn btn-primary mt-4' onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {isLoading ? (
        <div className='text-center mt-20'>
          <h1 className='uppercase text-4xl font-bold'>
            <span className='loading loading-spinner'></span>
          </h1>
        </div>
      ) : (
        renderProduct
      )}
    </div>
  );
};

export default ProductDetails;
