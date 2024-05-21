import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ShimmerUI from './ShimmerUI'
import RestaurantCategory from './RestaurantCategory'
import { useSelector } from 'react-redux'
import Cart from './Cart'
import { MENU_API_DESKTOP, MENU_API_MOBILE } from '../utils/constants'



const RestaurantMenu = () => {

    const {resId} = useParams()

    const [restaurantMenuDetails, setRestaurantMenuDetails] = useState([])

    const [restaurantMenu, setRestaurantMenu] = useState(null)

    const [isOpenIndex, setIsOpenIndex] = useState(null)

    const [showModal, setShowModal] = useState(false)

    const cartItems = useSelector((store) =>store.cart.items)

    const fetchRestaurantMenu = async() =>{
      if(window.screen.width >= 769){
        const data = await fetch(MENU_API_DESKTOP + resId +"&catalog_qa=undefined&submitAction=ENTER");
        
        var json = await data.json();
        
        var restaurantMenuHeaderDetails = json?.data?.cards[2]?.card?.card?.info

        setRestaurantMenuDetails(restaurantMenuHeaderDetails)


        var categories = json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(c => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

        setRestaurantMenu(categories)

      }else{

        const data = await fetch(MENU_API_MOBILE + resId +"&isMenuUx4=true&submitAction=ENTER");
        
        var json = await data.json();
        
        var restaurantMenuHeaderDetails = json?.data?.cards[2]?.card?.card?.info

        setRestaurantMenuDetails(restaurantMenuHeaderDetails)


        var categories = json?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(c => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

        setRestaurantMenu(categories)

      } 
    }

    useEffect(() =>{
        fetchRestaurantMenu()
    }, [])


  return (restaurantMenuDetails === undefined || restaurantMenuDetails.length ===0)? <ShimmerUI /> :
      <div className='sm:ml-60 ml-10 mr-10 mt-5 sm:mr-80 sm:mt-16'>
        <div className='flex flex-row justify-between item-center shadow-lg sticky'>
          <Link to ='/'>
            <img className='w-6 font-bold sm:mb-6 mb-4 sm:ml-1 ml-2 cursor-pointer' src='https://static-00.iconduck.com/assets.00/previous-arrow-backward-icon-512x512-xkxohgg6.png' alt='backward-arrow'/>
          </Link>
          <Link to="/restaurants/cart">
            <div className='flex cursor-pointer items-center mr-3'>
              <h1 className='font-bold'>Cart</h1>
              <h1 className='bg-red-500 text-white ml-1 p-0.5 font-semibold rounded-md'>{cartItems.length}</h1>
            </div>
          </Link>
        </div>
        <div>
          <h1 className='font-bold sm:text-3xl text-lg sm:mb-9 mb-3'>{restaurantMenuDetails.name}</h1>
        </div>
        <div className='border-solid border-2 ml-3 mr-3 border-gray-300 shadow-2xl rounded-lg sm:font-bold'>
          <div className='sm:pl-4 pl-3 sm:pb-1 pb-2 sm:pt-4 pt-2 sm:pr-4 pr-2 flex items-center '>
            <img className="w-4 h-4" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnWNr94CtMZhqwaPa91SBvw2Nsnmwj5RDFPwYKKvEChfdhm7VA_IiRQGYkLkQQsYhZLo&usqp=CAU' alt='star-rating' />
            <h1 className='ml-2 text-xs font-bold'>{restaurantMenuDetails?.avgRating}</h1>
            <h1 className='sm:ml-0 text-xs font-bold'>({restaurantMenuDetails?.totalRatingsString})</h1>
            <img className='sm:w-1.5 w-1 sm:ml-10 ml-3' src='https://spng.pngfind.com/pngs/s/16-164933_bullet-point-wisdom-1-grey-bullet-point-transparent.png' alt='' />
            <h1 className='sm:ml-3 ml-1 text-xs text font-bold'>{restaurantMenuDetails?.costForTwoMessage}</h1>
          </div>
          
          <div className='sm:pl-4 pl-3 pb-2 pr-2 font-bold text-xs text-orange-600 underline'>
            <h1>{restaurantMenuDetails.cuisines.join(" , ")}</h1>
          </div>
          <div className=' border-solid border-l-2 sm:ml-5 ml-3 sm:mr-3 mt-2 border-gray-300 sm:mb-5'>
            <div className='flex sm:mt-4'>
              <img className='w-1.5 h-1.5 -ml-1 sm:mt-0 ' src='https://spng.pngfind.com/pngs/s/16-164933_bullet-point-wisdom-1-grey-bullet-point-transparent.png' alt='' />
              <h1 className='sm:ml-3 sm:text-sm text-xs font-bold sm:-mt-2 -mt-1 ml-2'>Outlet</h1>
              <h1 className='text-gray-400 sm:font-normal sm:text-sm text-xs ml-3 sm:-mt-2 -mt-1'>{restaurantMenuDetails?.areaName}</h1>
            </div>
            <span className='flex'>
              <img className='w-1.5 h-1.5 -ml-1 mt-7' src='https://spng.pngfind.com/pngs/s/16-164933_bullet-point-wisdom-1-grey-bullet-point-transparent.png' alt='' />
              <h1 className='sm:ml-3 ml-2 sm:text-sm font-bold text-xs sm:mt-4 mt-5'>{restaurantMenuDetails?.sla?.slaString}</h1>
            </span>
          </div>
          <div className='flex items-center sm:border-solid sm:border-t-2 sm:ml-1 sm:border-gray-200 sm:mr-1'>
              <img className='w-5 h-5 object-fill sm:ml-4 sm:mt-5 sm:mb-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZfU8Wb6rf0ULBRsmBAaTuwGkYa4oGGzOaF7ZaL3tUfahaKn_8fgdPh43TkxGru-6bOeQ&usqp=CAU" alt='' />
              <h4 className='sm:ml-2 ml-1 mr-1 text-gray-400 font-normal sm:text-sm text-xs mb-3 mt-2'>{restaurantMenuDetails?.feeDetails?.message}</h4>

          </div>
        </div>
        {restaurantMenu.map((categories, index) =><RestaurantCategory key={categories?.card?.card?.title} category={categories?.card?.card} isOpen={index === isOpenIndex? true:false} setisOpen={()=>{
          index === isOpenIndex? setIsOpenIndex(null): setIsOpenIndex(index)
        }}/>)}
      </div>
}

export default RestaurantMenu


