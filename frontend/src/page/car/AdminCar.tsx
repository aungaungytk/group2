import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import AdminCarRequest from "../../components/car/AdminCar";

// import React from 'react';
export const Car  = () => {
    return(
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <h1 style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}>Car Reservation Requests Page</h1>

                <div style={{ marginRight: "15px" }}>
                    <AdminCarRequest />
                    
                </div>

            </div>
        </div>
    );
};