import { Link } from "react-router-dom";
import TableCar from "../../components/car/tableCar";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/UserSidbar";
import { Button } from "@mui/material";
export const Car  = () => {
    return(
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <h1 style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}>Car Reservation Page</h1>
                <div>
                    <Link to="/staff-dashboard/car-reservation/car-booking" style={{ display: "block", textAlign: "left", marginTop: "10px", marginLeft: "10px", cursor: "default" }}>
                        <Button size="medium" variant="contained" disableRipple>Car Data Page</Button>
                    </Link>
                </div>

                <div style={{ marginRight: "15px" }}>
                    <TableCar />
                    
                </div>

            </div>
        </div>
    );
};