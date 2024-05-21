import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black text-white flex justify-start sm:mt-3 sm:justify-center items-center h-10 sm:h-auto'>
      <img className='sm:w-24 sm:mx-32 w-9 mx-6' src='https://cdn.shopify.com/s/files/1/0617/1502/1977/files/swiggy_dark.webp?v=1660894890' alt='footer-logo'/>
      <h3 className='sm:mx-32 mx-6 sm:font-bold font-thin cursor-pointer'>Terms & Conditions</h3>
      <h3 className='sm:mx-32 mx-6 sm:font-bold font-thin cursor-pointer'>Policy</h3>
    </div>
  )
}

export default Footer