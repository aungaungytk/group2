import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CarRentalIcon from "@mui/icons-material/CarRental";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import AcePlus from "../img/mainLogo.png";
import { AuthRole } from "../../redux/features/type/authType";
import {  useAppSelector } from "../../redux/features/Hook";
import Groups3Icon from '@mui/icons-material/Groups3';
import CarRepairTwoToneIcon from '@mui/icons-material/CarRepairTwoTone';
import RoomPreferencesTwoToneIcon from '@mui/icons-material/RoomPreferencesTwoTone';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
export const Sidebar = () => {
  const authRedux = useAppSelector((state) => state.auth);
  
  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <img src={AcePlus} alt="" width={130} className="img" />
      </Link>
      <hr />
      {(authRedux.role === AuthRole.Admin ||
        authRedux.role === AuthRole.Superadmin) && (
        <>
          <div className="center">
            <ul>
              <p className="title">MAIN</p>
              <Link
                to={`/${authRedux.role}-dashboard`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <DashboardIcon className="icon" />
                  <span>Dashboard</span>
                </li>
              </Link>
              <p className="title">Lists</p>
              <Link
                to={`/${authRedux.role}-dashboard/pro-user`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <SupervisedUserCircleIcon className="icon" />
                  <span>Pro User</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/normal-user`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <PersonIcon className="icon" />
                  <span>Normal User</span>
                </li>
              </Link>
              <p className="title">Reservation</p>
              <Link
                to={`/${authRedux.role}-dashboard/room-reservation`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <MeetingRoomIcon className="icon" />
                  <span>Rooms</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <CarRentalIcon className="icon" />
                  <span>Cars</span>
                </li>
              </Link>
              <p className="title">Creation Process</p>
              <Link
                to={`/${authRedux.role}-dashboard/team-creation`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <Groups3Icon className="icon" />
                  <span>Create Team</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car-creation`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <CarRepairTwoToneIcon className="icon" />
                  <span>Create Car</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/room-creation`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <RoomPreferencesTwoToneIcon className="icon" />
                  <span>Create room</span>
                </li>
              </Link>
              <p className="title">Report</p>
              <Link
                to={`/${authRedux.role}-dashboard/room-reservation-report`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <MeetingRoomOutlinedIcon className="icon" />
                  <span>Room Reservation</span>
                </li>
              </Link>
              <Link
                to={`/${authRedux.role}-dashboard/car-reservation-report`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <CarRentalIcon className="icon" />
                  <span>Car Reservation</span>
                </li>
              </Link>

            </ul>
            </div>
            
        </>
      )}
    </div>
  );
};
