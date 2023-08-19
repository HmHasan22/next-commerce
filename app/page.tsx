import Products from '@/components/Product/Products';
export const Home: React.FC = () => {
  return (
    <div className=''>
      <div className='hero min-h-screen bg-base-200 pb-5'>
        <Products />
      </div>
    </div>
  );
};

export default Home;
