import React from 'react'
import Login from './Login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Restaurants from './Restaurants'
import Error from './Error'
import RestaurantMenu from './RestaurantMenu'
import Cart from './Cart'
import CheckoutSuccess from './CheckoutSuccess'


const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/restaurants/cart",
      element: <Cart />
    },
    {
      path: "/checkout-success",
      element: <CheckoutSuccess />
    },
    {
      path: "/restaurants",
      element: <Restaurants />,
    },
    {
      path: "/restaurants/:resName/:resId",
      element: <RestaurantMenu/>,
    },
    {
      path: '*',
      element: <Error />
    }


  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body