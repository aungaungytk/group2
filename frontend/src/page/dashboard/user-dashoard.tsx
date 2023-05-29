/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { TeamCard } from "../../components/card/teamCard";
import AdminCarReserveTable from "../../components/dashboard_table/AdminCarReserveTable";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/UserSidbar";
import AdminRoomReserveTable from "../../components/dashboard_table/AdminRoomReserveTable";
// import {Card} from "../../components/card/" 
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Card } from '../../components/card/card';

export interface roomReservationData {
  date: string;
  description: string;
  end_time: string;
  id: number;
  room_id: number;
  start_time: number;
  title: string;
  user_id: number;
}

export interface carReservationData {
  date: string;
  title: string;
  start_time: number;
  end_time: string;
  destination: string;
  no_of_traveller: number;
  status: number;
  id: number;
  car_id: number;
  user_id: number;
  remark: string;
  approved_by: string;
}

export const UserDashboard: React.FC = () => {
  const [roomReservation, setRoomReservation] = useState<roomReservationData[]>(
    []
  );

  const [carReservation, setcarReservation] = useState<carReservationData[]>(
    []
  );
  const authRedux = useAppSelector((state) => state.auth);
  const [carCount, setCarCount] = useState(0);
  const [roomCount, setroomCount] = useState(0);
  const [carReserveCount, setCarReserveCount] = useState(0);
  const [roomReserveCount, setRoomReserveCount] = useState(0);
  const [teamRoomReserveCount, setTeamRoomReserveCount] = useState([]);
  const [teamCarReserveCount, setTeamCarReserveCount] = useState([]);

  useEffect(() => {
    getRoomReservation().then((response: any) => {
      setRoomReservation(response.data);
    });

    getCarReservation().then((response: any) => {
      setcarReservation(response.data);
    });

    getRoomCount().then((response: any) => {
      setroomCount(response.data);
    });

    getCarCount().then((response: any) => {
      setCarCount(response.data);
    });

    getCarReserveCount().then((response: any) => {
      setCarReserveCount(response.data);
    });
    getRoomReserveCount().then((response: any) => {
      setRoomReserveCount(response.data);
    });

    getRoomReserveCountByTeam().then((response: any) => {
      setTeamRoomReserveCount(response.data);
    });

    getCarReserveCountByTeam().then((response: any) => {
      setTeamCarReserveCount(response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoomReservation = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/room_reservation", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  

  const getCarReservation = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/car_reservation",{
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getRoomCount = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/room_count", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getCarCount = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/car_count", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getCarReserveCount = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/car_reserve_count", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getRoomReserveCount = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/room_reserve_count", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getRoomReserveCountByTeam = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/room_reserve_count_by_team", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getCarReserveCountByTeam = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/car_reserve_count_by_team", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="dashboard-container" style={{ padding: "5px" }}>
          <Card title="Total Room" count={roomCount} />
          <Card title="Total Car" count={carCount} />
          <Card title="Total Room Reservation" count={roomReserveCount} />
          <Card title="Total Car Reservation" count={carReserveCount} />
          <h1
            style={{
              paddingTop: "5px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Room Reservation List
          </h1>
          <AdminRoomReserveTable data={roomReservation} />
          <h1
            style={{
              paddingTop: "5px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Car Reservation List
          </h1>
          <AdminCarReserveTable data={carReservation} />
            <h1>Total Room Reservation By Team</h1>
          <div>
            {teamRoomReserveCount &&
              teamRoomReserveCount.map((roomCount: any) =>{
                  return (
                    <TeamCard
                      teamName={roomCount.name}
                      key={roomCount.id}
                      count = {roomCount.reservation_count}
                    />
                  );
                })}
          </div>
          <h1>Total Car Reservation By Team</h1>
          <div>
            {teamCarReserveCount &&
              teamCarReserveCount.map((carCount: any) =>{
                  return (
                    <TeamCard
                      teamName={carCount.name}
                      key={carCount.id}
                      count = {carCount.car_reservation_count}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};
