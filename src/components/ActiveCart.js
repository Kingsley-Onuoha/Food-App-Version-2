import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, clearCart, deceraseItemQuantity, getTotals, removeItem } from '../utils/cartSlice'
import { Link } from 'react-router-dom'
import PayButton from './PayButton';
import { CLOUDINARYIMAGEID_URL } from '../utils/constants';



const ActiveCart = ({show, setShow}) => {

  const cart = useSelector((store) => store.cart)

  const cartItems = cart.items

  const dispatch = useDispatch()

  const handleItemRemove = (items)=>{
    dispatch(removeItem(items))
  }

  const handleDecreaseQuantity = (items) =>{
    dispatch(deceraseItemQuantity(items))
  }

  const handleIncreaseQuantity = (items) =>{
    dispatch(addItem(items))
  }
  
  const handleClearCart = () =>{
    dispatch(clearCart())
  }
  
  const handleClose = ()=>{
    setShow(!show)
}

  useEffect(()=>{

    dispatch(getTotals())

  }, [cart, dispatch])

  return (
    <div className='flex flex-col ml-3 mt-32 mr-3 sm:ml-16 sm:mr-16 border-amber-200 border-2 rounded-md p-1'>
        <div className='flex justify-center mt-2'>
          <h1 className='font-bold sm:text-2xl text-xl'>Cart Items</h1>
        </div>
        {cartItems.map(items =>
          <div className='flex items-center sm:justify-between p-2 mt-3 shadow-md sm:ml-16 sm:mr-16 sm:px-2 text-xs sm:text-lg'>   
            <div className='flex items-center w-24 sm:w-80 sm:p-1'>
              <div className='w-32 sm:w-48 mr-2'>
                <p className=''>{items?.card?.info?.name}</p>
                <button onClick={()=> handleItemRemove(items)} className='mt-2 bg-blue-800 text-white p-1 rounded-xl'>Remove</button>
              </div>
              <img className='w-12 sm:w-24 rounded-lg ' src={CLOUDINARYIMAGEID_URL + items?.card?.info?.imageId} alt={items?.card?.info?.name}/>
            </div>
            <div className='flex ml-2'>
              <div className='sm:ml-20 ml-3 flex flex-col items-center text'>
                <p className='font-bold text-gray-600'>Price</p>
                <h4>₹{items?.card?.info?.price/10}</h4>
              </div>
              <div className='sm:ml-20 ml-3 flex flex-col items-center'>
                <p className='font-bold text-gray-600 '>Units</p>
                <div className='flex border-2 border-gray-300 rounded-md items-center'>
                  <h4 className='sm:px-2 cursor-pointer' onClick={()=>handleIncreaseQuantity(items)}>+</h4>
                  <h4 className='ml-2 mr-2 border-2 border-gray-300 px-2'>{items?.cartQuantity}</h4>
                  <h4 className='sm:px-2 cursor-pointer' onClick={()=> handleDecreaseQuantity(items)}>-</h4>
                </div>
              </div>
              <div className='sm:ml-20 ml-3 flex flex-col items-center'>
                <p className='font-bold text-gray-600'>Total </p>
                <h4>₹{Math.ceil(items?.card?.info?.price/10)*items?.cartQuantity}</h4>
              </div>
            </div>
          </div>
        )}
          <div className='mt-4 flex justify-between sm:ml-16 sm:mr-16 gap-x-2 mb-4'>
            <div >
              <button className='rounded-md sm:p-2 px-3 w-28 bg-orange-500' onClick={()=> handleClearCart()}>Clear Cart</button>
            </div>
            <div>
              <div className='flex justify-between mr-2'>
                <h2 className='font-bold text-gray-600 sm:text-xl'>Subtotal</h2>
                <h2 className='sm:text-xl'>₹{cart?.totalAmount/10}</h2>
              </div>
              <p className='text-gray-500 text-sm mt-2'>Promo!!! Free Delivery for the next 2weeks</p>
             <PayButton items={cartItems}/>
              <div className='border-2 rounded-md sm:p-2 px-3 flex justify-center cursor-pointer mt-3 sm:mr-1 gap-x-1 sm:gap-x-2 p-1'>
                <img className='w-4 sm:w-6' src='https://static-00.iconduck.com/assets.00/previous-arrow-backward-icon-512x512-xkxohgg6.png' alt='arrow'/>
                <Link to='/'><h2 className='text-sm sm:text-lg'>Continue Shopping</h2></Link>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ActiveCart


