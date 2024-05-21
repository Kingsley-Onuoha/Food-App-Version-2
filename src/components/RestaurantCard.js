import React from 'react'
import { CLOUDINARYIMAGEID_URL } from '../utils/constants'


const RestaurantCard = (props) => {

    const {onlineData} = props

    const {name,avgRatingString,cuisines,cloudinaryImageId, areaName, costForTwo} = onlineData?.info

    const {slaString} = onlineData?.info?.sla 

    // const {subHeader} = onlineData?.info?.aggregatedDiscountInfoV3

  return (
    <div className='sm:mt-4 sm:ml-10 sm:mb-3 mt-3 mb-4 ml-6 mr-6 flex flex-col flex-nowrap overflow-hidden overflow-ellipsis cursor-pointer'>
        <div className='relative'>
            <img 
                className='sm:w-56 sm:h-40 w-72 h-60 object-cover bg-gradient-to-b from-black  rounded-lg'
                src={CLOUDINARYIMAGEID_URL + cloudinaryImageId}
                alt=''/>
            <div className='absolute sm:top-32 top-52 left-9 text-white sm:left-3 font-bold font sm:text-2xl text-3xl flex'>
                <h1>{costForTwo}</h1>
            </div>
        </div>
        <div className='sm:w-56 flex flex-col'>
            <h1 className='font-bold mt-2'>{name}</h1>
            <div className='text-gray-900 flex text-sm'>
                <div  className='flex items-center'>
                    <img 
                        className='sm:w-4 sm:h-4 w-4 h-4'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnWNr94CtMZhqwaPa91SBvw2Nsnmwj5RDFPwYKKvEChfdhm7VA_IiRQGYkLkQQsYhZLo&usqp=CAU" alt=''
                    />
                    <h3 className='sm:ml-2 ml-2'>{avgRatingString}</h3>
                </div>
                <h3 className='ml-2'> • {slaString}</h3>
            </div>
            <h3 className='text-gray-500 text-sm'>{cuisines?.join(" , ")}</h3>
            <h3 className='text-gray-500 text-sm'>{areaName}</h3>
        </div>
    </div>
  )
}

export default RestaurantCard