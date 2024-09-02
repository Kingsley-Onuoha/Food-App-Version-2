import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RestaurantCollections from "./RestaurantCollections";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./ShimmerUI";
import ShimerCircular from "./ShimerCircular";

const Restaurants = () => {
  const [restaurantAPI, setRestaurantAPI] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [restaurantWithDeliveryAPI, setRestaurantWithDeliveryAPI] = useState(
    []
  );

  const fetchCollectionData = async () => {
    if (window.screen.width >= 769) {
      const data = await fetch(
        "https://new-cors.onrender.com/api/proxy/swiggy/dapi/restaurants/list/v5?lat=18.969539&lng=72.819329&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      var json = await data.json();

      var restaurantCollectionCard =
        json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;

      setRestaurantAPI(restaurantCollectionCard);

      var restaurantsWithOnlineDelivery =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setRestaurantWithDeliveryAPI(restaurantsWithOnlineDelivery);
    } else {
      const data = await fetch(
        "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=18.969539&lng=72.819329&carousel=true&third_party_vendor=1"
      );

      var json = await data.json();

      var restaurantCollectionCard =
        json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;

      setRestaurantAPI(restaurantCollectionCard);

      var restaurantsWithOnlineDelivery =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setRestaurantWithDeliveryAPI(restaurantsWithOnlineDelivery);
    }
  };

  useEffect(() => {
    fetchCollectionData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray" }}
        onClick={onClick}
      />
    );
  }

  return (
    <div>
      <Header />

      <div className="flex justify-center items-center mt-6">
        <input
          className="sm:w-36 w-40 px-2 h-8 border border-slate-500 rounded-l-xl"
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="text-white bg-slate-600 rounded-r-xl w-16 px-2 h-8"
          onClick={() => {
            const filteredRestaurant = restaurantWithDeliveryAPI.filter(
              (rest) =>
                rest.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setRestaurantWithDeliveryAPI(filteredRestaurant);
            console.log(restaurantWithDeliveryAPI);
          }}
        >
          Search
        </button>
      </div>
      {restaurantAPI === undefined || restaurantAPI.length === 0 ? (
        <ShimerCircular />
      ) : (
        <div className="sm:ml-16 sm:mr-16 ml-6 mr-6">
          <h1 className="sm:font-bold sm:text-xl sm:mt-5 sm:ml-10 font-bold mt-5 mb-3 ml-9 text-gray-800">
            What's on your mind?
          </h1>
          <div className="sm:px-6 mr-6 ml-6">
            <Slider {...settings}>
              {restaurantAPI.map((restaurantCollections) => (
                <RestaurantCollections
                  key={restaurantCollections.id}
                  resData={restaurantCollections}
                />
              ))}
            </Slider>
          </div>
        </div>
      )}
      {restaurantWithDeliveryAPI === undefined ||
      restaurantWithDeliveryAPI.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="sm:ml-16 sm:mr-16 mt-4 ml-6 mr-6">
          <h1 className="sm:font-bold sm:text-xl sm:mt-5 sm:ml-10 ml-8 font-bold mt-5 text-gray-800">
            Restaurants with online food delivery
          </h1>
          <div className="flex flex-wrap justify-center">
            {restaurantWithDeliveryAPI.map((onlineRestaurants) => (
              <Link
                to={
                  "/restaurants/" +
                  onlineRestaurants?.info?.name +
                  "/" +
                  onlineRestaurants?.info?.id
                }
              >
                <RestaurantCard
                  key={onlineRestaurants?.info?.id}
                  onlineData={onlineRestaurants}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Restaurants;
