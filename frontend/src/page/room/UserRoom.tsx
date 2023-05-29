import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/UserSidbar";
import Room from "./Room";

// import React from 'react';

export const UserRoom  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <Room/>
            </div>
            
        </div>
    );
};