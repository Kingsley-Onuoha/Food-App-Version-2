import React from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react';

const EmptyCart = ({show, setShow}) => {

    const handleClose = ()=>{
        setShow(!show)
    }
    return(
        <div className="flex flex-col justify-center items-center ml-3 mr-3 mt-10 border-amber-200 border-2 rounded-md p-3">
            <img src={"https://img.freepik.com/premium-vector/fried-eggs-are-cooked-frying-pan-gas-burner-vector-illustration-cooking-home-pan_106796-1748.jpg"} alt="" />
            <h3 className='font-bold mt-3 text-lg sm:text-2xl'>Your cart is empty</h3>
            <p className='text-center mt-2'>You can go to home page to view more restaurants</p>
            <div className='border-2 rounded-md sm:p-2 px-3 flex justify-center cursor-pointer mt-3 mr-1 gap-x-0.5 sm:gap-x-2 p-1'>
                <img className='w-5 sm:w-6' src='https://static-00.iconduck.com/assets.00/previous-arrow-backward-icon-512x512-xkxohgg6.png' alt='arrow'/>
                <Link to='/'><h2 className=''>Continue Shopping</h2></Link>
              </div>
        </div>
    )
}

export default EmptyCart