import CarDataTable from "../../components/car/CarDataTable";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

// import React from 'react';

export const CarBooking  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <CarDataTable/>
            </div>
            
        </div>
    );
};