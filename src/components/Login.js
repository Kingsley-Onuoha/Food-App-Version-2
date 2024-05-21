import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
  const email = useRef(null);

  const password = useRef(null);

  const name = useRef(null);

  const [isSignIn, setIsSignIn] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);

    if (message == null) {
      if (!isSignIn) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
              displayName: name.current.value,
            })
              .then(() => {
                //Update our Redux store

                const { uid, email, displayName } = auth.currentUser;

                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                  })
                );
              })
              .catch((error) => {
                setErrorMessage(errorMessage);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 px-7 h-auto w-[80%] sm:w-[30%] my-12 mx-auto right-0 left-0 border border-gray-400 shadow-xl rounded-md ">
        <form className="" onSubmit={(e) => e.preventDefault()}>
          <div>
            <h1 className="font-bold my-2 sm:text-2xl">
              {isSignIn ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignIn && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name (Surname, First Name)"
                className="py-1 px-1 h-10 w-full text-md font-normal my-2 text-black border-gray-500 shadow-lg border rounded"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="py-1 px-1 h-10 w-full text-md font-normal my-2 text-black border-gray-500 shadow-lg border rounded"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="py-1 px-1 h-10 w-full text-md font-normal my-2 text-black border-gray-500 shadow-lg border rounded"
            />
            <p className="text-sm text-red-500">{errorMessage}</p>
            <button
              className="my-2 p-1 h-10 text-base text-white bg-orange-600 w-full font-thin rounded"
              onClick={handleButtonClick}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <span className="flex flex-row my-3 text-sm">
              <p>{isSignIn ? "New to Swiggy?" : "Already Registered?"}</p>
              <p
                className="mx-2 cursor-pointer hover:underline underline-offset-4 text-red-500 font-bold"
                onClick={toggleSignInForm}
              >
                {isSignIn ? "Sign Up Now" : "Sign In Here"}
              </p>
            </span>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
