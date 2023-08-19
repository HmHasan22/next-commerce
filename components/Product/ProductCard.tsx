import React from 'react';
import LazyImage from '../UI/LazyImage';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
type Props = {
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  id: string;
};

const ProductCard = (props: Props) => {
  const cart = useSelector((state: any) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleProductView = () => {
    router.push(`/product-details/${props.id}`);
  };
  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    const item = cart.items.find((item: any) => item.id === props.id);
    if (item) {
      if (typeof window !== 'undefined') {
        window.alert('Item already added to cart');
      }
    } else {
      dispatch(
        addToCart({
          id: props.id,
          title: props.title,
          quantity: 1,
          image: props.image,
          total: props.price,
          description: props.description,
          price: props.price,
        })
      );
      if (typeof window !== 'undefined') {
        window.alert('Item added to cart');
      }
    }
  };
  return (
    <div
      onClick={handleProductView}
      className='card w-full cursor-pointer bg-base-100 shadow-xl relative group'
    >
      <div
        onClick={handleAddToCart}
        title='Add to cart'
        className='
        absolute top-[10px] z-10 h-[70px] w-[70px] rounded-full right-[10px] flex items-center justify-center text-white bg-[#083344]  group-hover:opacity-100  transition duration-300  ease-in-out cursor-pointer opacity-0'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          fill='currentColor'
          className='bi bi-bag'
          viewBox='0 0 16 16'
        >
          {' '}
          <path d='M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z' />{' '}
        </svg>
      </div>
      <figure>
        {props.image && (
          <div className='cart-image px-5 py-4'>
            <LazyImage
              className='object-contain'
              src={props.image}
              alt={props.title}
            />
          </div>
        )}
      </figure>
      <div className='card-body'>
        <div className='card-actions '>
          <div className='badge badge-outline p-3 uppercase'>
            {props.category}
          </div>{' '}
          <div className='badge badge-outline p-3 uppercase font-bold'>
            ${props.price}
          </div>
        </div>
        <h2 className='card-title text-sm'>
          {props.title && props.title.length > 60
            ? props.title.slice(0, 60) + '...'
            : props.title}
        </h2>
        <p>
          {props.description && props.description.length > 70
            ? props.description.slice(0, 70) + '...'
            : props.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
