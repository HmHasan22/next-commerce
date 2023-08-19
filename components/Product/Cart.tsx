'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
} from '@/redux/features/cart/cartSlice';
import { RootState } from '../../redux/index';
import LazyImage from '../UI/LazyImage';
import Link from 'next/link';
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  // ******************* DECREMENT CART *******************
  const handleDecrement = async (id: any, quantity: any) => {
    dispatch(
      updateQuantity({
        id: id,
        quantity: quantity - 1,
      })
    );
  };
  // ******************* INCREMENT CART *******************
  const handleIncrement = (id: any, quantity: any) => {
    dispatch(
      updateQuantity({
        id: id,
        quantity: quantity + 1,
      })
    );
  };
  // ******************* REMOVE CART *******************
  const handleRemoveCart = (id: any) => {
    dispatch(removeFromCart(id));
  };
  // ******************* RENDER CART ITEMS *******************
  let cartItems = null;
  if (cart.items.length > 0) {
    cartItems = cart.items.map((item, index) => {
      return (
        <div className='rounded-md shadow-md' key={index}>
          <div className='grid grid-cols-12 items-center my-4 p-5'>
            <div className='col-span-4 cart-details-image'>
              <LazyImage
                src={item.image}
                className='w-24 h-24 object-cover rounded-md'
                alt='product image'
              />
            </div>
            <div className='col-span-7'>
              <div className='flex mb-4 justify-end items-center'>
                <button
                  disabled={item.quantity <= 1}
                  onClick={() => handleDecrement(item.id, item.quantity)}
                  className='btn btn-primary'
                >
                  -
                </button>
                <input
                  disabled
                  type='number'
                  className='text-center bg-transparent text-xl'
                  value={item.quantity}
                />
                <button
                  disabled={item.quantity >= 10}
                  onClick={() => handleIncrement(item.id, item.quantity)}
                  className='btn btn-primary'
                >
                  +
                </button>
              </div>
              <h2 className='text-2xl font-bold'>${item.total}</h2>
              <div className='flex items-center gap-5 my-5'>
                <h2 className='text-xl font-bold'>{item.title}</h2>
              </div>
              <p>{item.description}</p>
              <button
                onClick={() => handleRemoveCart(item.id)}
                className='btn btn-primary mt-5'
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      {cartItems ?? (
        <div className='text-center mt-20'>
          <h1 className='uppercase text-4xl font-bold'>Cart is empty</h1>
          <Link href='/'>
            <button className='btn btn-primary mt-5'>Continue Shopping</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
