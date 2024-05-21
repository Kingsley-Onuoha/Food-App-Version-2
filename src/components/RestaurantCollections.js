
import React from 'react'
import { CLOUDINARYIMAGEID_URL } from '../utils/constants'


const RestaurantCollections = (props) => {

  const {resData}= props

  const {imageId} = resData

  return (
    <div className='sm:p-1 sm:mx-3 cursor-pointer'>
      <img 
        className='sm:w-36 object-cover w-52'
        src={CLOUDINARYIMAGEID_URL + imageId}
        alt=''
      />
    </div>
  )
}

export default RestaurantCollections