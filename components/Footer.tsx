import React from 'react';

const Footer = () => {
  return (
    <footer className='py-5  text-center shadow-xl border bg-white'>
      <p className='text-md text-gray-500'>
        &copy; {new Date().getFullYear()} - All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
