import AdminRoomComponent from "../../components/create/room";
import Team from "../../components/create/team";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";

export const RoomCreation  = () => {
    return(
        <div className='home'>
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1>Room Creation Page </h1>
                <AdminRoomComponent/>
            </div>
            
        </div>
    );
};