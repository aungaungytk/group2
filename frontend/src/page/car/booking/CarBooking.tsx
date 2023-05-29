// import React from 'react';

import { useNavigate } from "react-router-dom";
import CarDataTable from "../../../components/car/CarDataTable";
import Navbar from "../../../components/navbar/navbar";
import { Sidebar } from "../../../components/sidebar/UserSidbar";

export const CarBooking = () => {
   
    
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        <h1> Car Booking Page </h1>
        <CarDataTable />
      </div>
    </div>
  );
};
