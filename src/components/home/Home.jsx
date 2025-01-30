import React, { useEffect, useState } from "react";
import MainHeader from "../../layout/MainHeader";
import Parallax from "../common/Parallax";
import HotelServices from "../common/HotelServices";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [loggedout, setLoggedout] = useState("")

  useEffect(() => {
    const message = location.state && location.state.message;
    if (message) {
      setLoggedout(message);
      const timeout = setTimeout(() => {
        setLoggedout("");
      }, 5000);

      // Cleanup timeout on component unmount or when location changes
      return () => clearTimeout(timeout);
    }
  }, [location]);

 
  return (
    
          <section>
            {loggedout && <p className="text-warning px-5 mt-5">{loggedout}</p>}
            <MainHeader />
            
            <section className="container">
              <RoomSearch/>
              <RoomCarousel/>
              <Parallax />
              <HotelServices />
              <Parallax />
            </section>
          </section>
  
  )
};

export default Home;
