import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/cartSlice'
import { CLOUDINARYIMAGEID_URL } from '../utils/constants'

const ItemList = ({items}) => {
  
  const dispatch = useDispatch()
  
  const handleAddItem = (item)=>{
    dispatch(addItem(item))
  }

  return (
    <>{items.map (item =><div className='flex items-center justify-between mb-3 mt-3 p-2 ml-5 mr-5 bg-slate-200 sm:font-semibold relative' key={item?.card?.info?.name}>
        <div>
          <h1 className='text-sm'>{item?.card?.info?.name}</h1>
          <h4>₹{item?.card?.info?.price/10}</h4>
        </div>
        <img className='sm:w-36 w-16 sm:h-24 h-14 sm:object-cover sm:p-1 rounded-lg ' src={CLOUDINARYIMAGEID_URL + item?.card?.info?.imageId} alt='image' />
        <button className='bg-black text-white font-semibold text-sm absolute sm:right-14 right-4 sm:top-20 top-10 sm:p-1.5 p-0.5 rounded-lg' onClick={()=>handleAddItem(item)}>Add + </button>
    </div>)}
    </>
  )
}

export default ItemList