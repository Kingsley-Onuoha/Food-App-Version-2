import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addUser,removeUser } from '../utils/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut  } from "firebase/auth";
import { ShoppingCart } from 'lucide-react';


const Header = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = useSelector(store=>store.user)

    const cartItems = useSelector((store) =>store.cart.items)


    useEffect (()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            
            const {uid, email, displayName,} = user;
    
            dispatch (
              addUser({
              uid:uid,
              email:email,
              displayName:displayName,
            }))
            navigate("/restaurants")
          } else {
    
            dispatch(removeUser())
            navigate("/")
          }
        });
        // unsubscribe, whenever our component unmounts
        return () => unsubscribe()
      }, [])

      const handleSignOut =()=>{

        signOut(auth).then(() => {
  
      }).catch((error) => {
        
        // if  sign out is not successful, send user to error page
  
        navigate("/error")
      });
    }

  return (
    <div className="h-18 sm:h-20 bg-white shadow-lg flex justify-between sm:px-10 sticky">
      <div className="scale-x-90 cursor-pointer">
        <Link to="/restaurants">
          <img
            className="sm:h-20 sm:w-20 w-12 h-10 "
            src="https://i.pinimg.com/736x/b3/8a/a1/b38aa1b21050b0e769a97eb751d12829.jpg"
            alt="logo"
          />
        </Link>
      </div>
      {user && (
        <div className="flex justify-around items-center text-gray-600 font-bold sm:px-0 px-2">
          <div className="flex items-center sm:mx-10 mx-2">
            <img
              className="sm:w-12 w-7"
              src="https://t3.ftcdn.net/jpg/05/99/84/86/360_F_599848646_MdK7wVDJQZygObyKEahVkOuhh0IGdTt3.jpg"
              alt=""
            />
            <button className="sm:-mx-2 sm:text-lg text-sm">Search</button>
          </div>
          <Link to="/restaurants/cart">
            <div className="flex cursor-pointer items-center mr-3 mx-5 sm:mx-10">
              <ShoppingCart size={14} />
              <h1 className="font-bold ml-1">Cart</h1>
              <h1 className="bg-red-500 text-white ml-1 p-0.5 font-semibold rounded-md">
                {cartItems.length}
              </h1>
            </div>
          </Link>
          <div
            className="flex items-center sm:mx-10 mx-2"
            onClick={handleSignOut}
          >
            <img
              className="sm:w-6 w-3 sm:text-lg text-sm font-black"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6eM1sKCPuQI_UQ7XK7Mjzn1iRpSOVNSgcWox8DWe5GVHDvSxT9C3h2h8GlEyqPPMFwF0&usqp=CAU"
              alt=""
            />
            <button className="sm:mx-1 sm:text-lg text-sm">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header