import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
// import { useAppSelector } from "../../redux/features/Hook";
import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../dashboard/admin-dashboard";
import { ProUserList } from "../list/pro";
import { NormalUserList } from "../list/normal";
import { Car } from "../car/AdminCar";
import { AdminRoom } from "../room/AdminRoom";
import CarCRUD from "../creation/CarCRUD";
import { RoomCreation } from "../creation/roomCreation";
import { TeamCreation } from "../creation/teamCreation";
import { ReportCar } from "../report/carReport";
import { ReportTeam } from "../report/teamReport";
import { ReservationCarReport } from "../report/carReservationReport";
import { ReservationRoomReport } from "../report/roomReservationReport";
import { ReportRoom } from "../report/roomReport";
// import { CarBooking } from "../car/car";
// import CarDataTable from "../../components/car/CarDataTable";
import RoomReservationForm from "../../components/room/RoomReservationForm";

function AdminView() {
  const { darkMode } = useContext(DarkModeContext);
  // const authRedux = useAppSelector((state) => state.auth);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route
          path="/*"
          element={<AdminDashboard />}
        />
        <Route
          path="/pro-user"
          element={<ProUserList />}
        />
        <Route
          path={`/normal-user`}
          element={<NormalUserList />}
        />
        <Route
          path={`/car`}
          element={<Car />}
        />
        <Route
          path={`/room-reservation`}
          element={<AdminRoom />}
        />
        <Route
          path={`/room-reservation/reserve`}
          element={<RoomReservationForm />}
        />

        <Route
          path={`/car-report`}
          element={<ReportCar />}
        />

        <Route
          path={`/team-report`}
          element={<ReportTeam />}
        />

        <Route
          path={`/car-reservation-report`}
          element={<ReservationCarReport />}
        />


        <Route
          path={`/room-reservation-report`}
          element={<ReservationRoomReport />}
        />

        <Route
          path={`/room-report`}
          element={<ReportRoom />}
        />
        <Route
          path={`/car-creation`}
          element={<CarCRUD />}
        />
        <Route
          path={`/room-creation`}
          element={<RoomCreation />}
        />
        <Route
          path={`/team-creation`}
          element={<TeamCreation />}
        />
        {/* <Route
          path={`/car-reservation`}
          element={<CarBooking />}
        /> */}
        
      </Routes>
    </div>
  );
}

export default AdminView;
