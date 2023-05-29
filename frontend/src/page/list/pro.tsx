
import ProUser from "../../components/User/proUser";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

// import React from 'react';

export const ProUserList  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1>Pro  User List Process Page</h1>
                <ProUser/>
            </div>
    </div>
    );
};