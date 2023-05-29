// import React from 'react';
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CarRentalIcon from "@mui/icons-material/CarRental";
import { Link } from "react-router-dom";
import AcePlus from "../img/mainLogo.png";
import { AuthRole } from "../../redux/features/type/authType";
import {  useAppSelector } from "../../redux/features/Hook";
export const Sidebar = () => {
  const authRedux = useAppSelector((state) => state.auth);
  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <img src={AcePlus} alt="" width={130} className="img" />
      </Link>
      <hr />
      {authRedux.role === AuthRole.staff && (
        <>
          <div className="center">
            <ul>
              <p className="title">Reservation</p>
              <Link
                to={`/${authRedux.role}-dashboard/room-seversation`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <MeetingRoomIcon className="icon" />
                  <span>Rooms</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car-reservation`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <CarRentalIcon className="icon" />
                  <span>Cars</span>
                </li>
              </Link>
              {/* <p className="title">SETTING</p>
          <li>
            <AccountCircleRoundedIcon className="icon" />
            <span>Profile</span>
          </li> */}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
