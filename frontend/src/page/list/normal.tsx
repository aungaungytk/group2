import NormalUser from "../../components/User/normaluser";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

// import React from 'react';

export const NormalUserList  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1>Normal User List Process Page</h1>
                <NormalUser/>
            </div>
    </div>
    );
};