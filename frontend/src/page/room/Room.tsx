/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReservationsDataTable from "../../components/room/ReservationsDataTable";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogContent } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";

export interface ReservationData {
  date: string;
  description: string;
  end_time: number;
  id: number;
  room_id: number;
  start_time: number;
  title: string;
  user_id: number;
}

export interface RoomData {
  id: number;
  name: string;
}

export interface TeamData {
  id: number;
  name: string;
}
export interface UserData {
  id: number;
  name: string;
  email: string;
  team_id: number;
}

export const Room: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const authUser = authRedux.user;
  const [userData, setUserData] = useState<UserData[]>([]);
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [teamData, setTeamData] = useState<TeamData[]>([]);
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getTimeFormat = (date: string) => {
    const [hours, minutes, seconds] = date.split(":");
    const time = new Date();
    time.setHours(Number(hours));
    time.setMinutes(Number(minutes));
    time.setSeconds(Number(seconds));
    return time;
  };
  const [userReservationData, setUserReservationData] = useState<
    ReservationData[]
  >([]);

  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [SearchByDateData, setSearchByDateData] = useState<ReservationData[]>(
    []
  );

  const initialInputValue: ReservationData = {
    id: 0,
    title: "",
    description: "",
    date: "",
    start_time: 0,
    end_time: 0,
    room_id: 1,
    user_id: 1,
  };

  const [inputValues, setInputValues] = useState(initialInputValue);

  useEffect(() => {
    getRoomData();
    getTeamData().then((response: any) => {
      setTeamData(response.data);
    });
    getUserData().then((response: any) => {
      setUserData(response.data);
    });
    getUserReservationData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDataSearchByDate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDate]);

  const getDataSearchByDate = async () => {
    try {
      const requestBody = {
        date: searchDate,
      };

      const response = await axios.post(
        "http://localhost:8000/api/room_reservation/searchByDate",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      );
      if (Array.isArray(response.data.data)) {
        const data: ReservationData[] = response.data.data.map((item: any) => ({
          title: item.title,
          description: item.description,
          room_id: item.room_id,
          start_time: Number(item.start_time.split(":")[0]),
          end_time: Number(item.end_time.split(":")[0]),
          date: item.date,
          user_id: item.user_id,
        }));
        setSearchByDateData(data);
      } else {
        console.error("Invalid data format. Expected an array.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/rooms", {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      });
      setRoomData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getTeamData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/teams", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
          console.log(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  //console.log(teamData);
  const getUserData = () => {
    const API_URL = "http://localhost:8000/api/users";
    const authToken = authRedux.token;

    return new Promise((resolve, reject) => {
      axios
        .get(API_URL, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        .then((response) => {
          resolve(response.data);
          // console.log(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const getUserReservationData = async () => {
    try {
      // const url = `http://localhost:8000/api/room_reservation/searchByUserAndDate/${authUser.id}`;
      const response = await axios.get(
        `http://localhost:8000/api/room_reservation/searchByUserAndDate/${authUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      );
      setUserReservationData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    // inputValues["user_id"] = authUser;
    console.log(inputValues);
    sendDataToBackend({ inputValues });
    setOpen(false);
    // resetForm();
  };
//   const resetForm = () => {
//     setInputValues(initialInputValue);
//   };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const sendDataToBackend = (data: { inputValues: ReservationData }) => {
//     fetch(`http://127.0.0.1:8000/api/room_reservation/${inputValues.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(inputValues),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((responseData) => {
//         console.log(responseData);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
const sendDataToBackend = (data: { inputValues: ReservationData }) => {
    axios
      .patch(
        `http://127.0.0.1:8000/api/room_reservation/${inputValues.id}`,
        JSON.stringify(data.inputValues),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const TimeFormatConverter = (time: number) => {
    const [hour, minutes] = time.toString().split(":");
    const date = new Date(0, 0, 0, Number(hour), Number(minutes));

    const twelveHourFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return twelveHourFormat.format(date);
  };

  const columns: TableColumn<ReservationData>[] = [
    {
      name: "Date",
      selector: (row: ReservationData) => row.date,
    },
    {
      name: "Title",
      selector: (row: ReservationData) => row.title,
    },
    {
      name: "Description",
      selector: (row: ReservationData) => row.description,
    },
    {
      name: "Start time",
      selector: (row: ReservationData) => TimeFormatConverter(row.start_time),
    },
    {
      name: "End time",
      selector: (row: ReservationData) => TimeFormatConverter(row.end_time),
    },

    {
      name: "Actions",
      cell: (row: ReservationData) => (
        <>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={(e: any) => {
                e.preventDefault();
                handleEdit(row);
              }}
              disabled={getTimeFormat(row.start_time.toString()) < currentTime}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ marginLeft: "5px" }}
              onClick={(e: any) => {
                e.preventDefault();
                handleDelete(row.id);
              }}
              disabled={getTimeFormat(row.start_time.toString()) < currentTime}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];
  const handleEdit = (data: ReservationData) => {
    setInputValues({ ...data });
    setOpen(true);
  };
  const handleDelete = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/room_reservation/${id}`)
        .then(() => {
          setUserReservationData((prevData) =>
            prevData.filter((item) => item.id !== id)
          );
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return (

        <div className="reservation-container">
          <h1 className="padding">Meeting Rooms Schedule</h1>

          <div className="date">
            <div className="date__reservationBtn">
              <Link to={`/${authRedux.role}-dashboard/room-reservation/reserve`} className="link-style">
                Reserve Room
              </Link>
            </div>
            {/* <h3>Sunday 21 May 2023</h3> */}
            {/* <div>My Reservations</div> */}
            <div className="date__dateFilter">
              <label>Data Show By Date : &nbsp;</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </div>

          <div className="reservation-table">
            <ReservationsDataTable
              rooms={roomData}
              reservationData={SearchByDateData}
              teamData={teamData}
              userData={userData}
            />
          </div>
          <div className="userData">
            <h1 className="padding">Your Reservation for Today</h1>
            <div className="userData__table">
              <DataTable
                columns={columns}
                //className={darkMode ? "darkTable" : ""}
                data={userReservationData}
                theme="solarized"
                pagination
                customStyles={{
                  table: {
                    style: {
                      backgroundColor: "#000",
                    },
                  },
                }}
              />
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                  <form onSubmit={handleFormSubmit}>
                    <div>
                      <div className="elem-group">
                        <label htmlFor="room">Room</label>
                        <select
                          name="room_id"
                          value={inputValues.room_id}
                          onChange={handleSelectChange}
                        >
                          {roomData.map((roomData) => (
                            <option key={roomData.id} value={roomData.id}>
                              {roomData.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="elem-group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={inputValues.title}
                          onChange={handleInputChange}
                          placeholder="To meet with the client"
                        />
                      </div>

                      <div className="elem-group">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          name="description"
                          value={inputValues.description}
                          onChange={handleInputChange}
                          placeholder="Agenda"
                          required
                        />
                      </div>

                      <div className="elem-group inlined">
                        <select
                          name="start_time"
                          value={inputValues.start_time}
                          onChange={handleSelectChange}
                        >
                          <option value="9:00:00">09:00am</option>
                          <option value="10:00:00">10:00am</option>
                          <option value="11:00:00">11:00am</option>
                          <option value="12:00:00">12:00pm</option>
                          <option value="13:00:00">01:00pm</option>
                          <option value="14:00:00">02:00pm</option>
                          <option value="15:00:00">03:00pm</option>
                          <option value="16:00:00">04:00pm</option>
                        </select>
                      </div>
                      <div className="elem-group inlined">
                        <select
                          name="end_time"
                          value={inputValues.end_time}
                          onChange={handleSelectChange}
                        >
                          <option value="10:00:00">10:00am</option>
                          <option value="11:00:00">11:00am</option>
                          <option value="12:00:00">12:00pm</option>
                          <option value="13:00:00">01:00pm</option>
                          <option value="14:00:00">02:00pm</option>
                          <option value="15:00:00">03:00pm</option>
                          <option value="16:00:00">04:00pm</option>
                          <option value="17:00:00">05:00pm</option>
                        </select>
                      </div>
                      <div className="elem-group">
                        <label htmlFor="date">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={inputValues.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <button type="submit">Update</button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
  );
};

export default Room;
