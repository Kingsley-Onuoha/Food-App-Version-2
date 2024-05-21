import React from 'react'
import { useSelector } from 'react-redux'
import EmptyCart from './EmptyCart'
import ActiveCart from './ActiveCart'



const Cart = ({show, setShow}) => {

  const cart = useSelector((store) => store.cart)

  return (
    <div className='flex justify-center items-center ml-6 mr-6'>
      {cart.items.length == 0 ? <EmptyCart show={show} setShow={setShow}/>: <ActiveCart show={show} setShow={setShow}/>}
    </div>
  )
}
export default Cart