import Navbar from "../../components/navbar/navbar";
import PersonalProfile from "../../components/profile/profile";
import { Sidebar } from "../../components/sidebar/AdminSidebar";


// import React from 'react';
export const Profile  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <PersonalProfile/>
            </div>
    </div>
   
    );
};