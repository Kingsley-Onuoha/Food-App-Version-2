import React, { useState } from 'react'
import ItemList from './ItemList'

const RestaurantCategory = ({category, isOpen, setisOpen}) => {


    const handleClick = () =>{
        setisOpen(!isOpen)
    }

  return (
    <div className='ml-2 mr-2 mb-10'>
        <div className='flex justify-between items-center category mt-10 sm:p-3 p-1 sm:rounded-md cursor-pointer shadow-xl sm:mb-6'onClick={handleClick}>
            <h1 className='sm:font-bold text-base font-semibold'>{category?.title} ({category?.itemCards?.length})</h1>
            <div>
                {isOpen && <img className='w-4 ' src='https://cdn-icons-png.flaticon.com/512/54/54817.png' alt='' />}
                {!isOpen && <img className='w-4'src='https://cdn-icons-png.flaticon.com/512/25/25623.png' alt='' />}
            </div>
        </div>
       {isOpen && < ItemList items={category?.itemCards}/>}

    </div>
  )
}

export default RestaurantCategory