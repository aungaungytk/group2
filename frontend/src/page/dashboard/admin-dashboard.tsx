/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Card } from '../../components/card/card';
import Charts from "../chart/Charts";
import debounce from "lodash/debounce";


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

export const AdminDashboard: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [carCount, setCarCount] = useState(0);
  const [roomCount, setroomCount] = useState(0);
  const [carReserveCount, setCarReserveCount] = useState(0);
  const [roomReserveCount, setRoomReserveCount] = useState(0);

  useEffect(() => {
    const debouncedFetchData = debounce(() => {
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
    }, 500); // Adjust the debounce delay as needed

    debouncedFetchData();

    return () => {
      // Clear the debounce function on component unmount
      debouncedFetchData.cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
        </div>
        <div>
          <Charts/>
        </div>
      </div>
    </div>
  );
};
