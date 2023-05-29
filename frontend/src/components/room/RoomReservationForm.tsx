import Navbar from "../../components/navbar/navbar";
import { Sidebar } from "../../components/sidebar/AdminSidebar";
import { useAppSelector } from "../../redux/features/Hook";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface InputValue {
  team_id: number;
  start_time: string;
  end_time: string;
  room_id: number;
  title: string;
  description: string;
  date: string;
  user_id: number;
}
export interface RoomData {
  id: string;
  name: string;
}
const RoomReservationForm: React.FC = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const authUser = authRedux.user.id;
  const [minDate] = useState(() => new Date().toISOString().split("T")[0]); // Set the current date as the minimum selectable date

  const initialInputValue: InputValue = {
    title: "",
    description: "",
    date: "",
    team_id: 1,
    start_time: "",
    end_time: "",
    room_id: 1,
    user_id: 1,
  };

  const [inputValue, setInputValue] = useState(initialInputValue);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getRoomData().then((response: any) => {
      setRoomData(response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoomData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/rooms", {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    inputValue["user_id"] = authUser;
    sendDataToBackend({ inputValue });
    resetForm();
  };
  const resetForm = () => {
    setInputValue(initialInputValue);
  };
  const sendDataToBackend = (data: { inputValue: InputValue }) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/room_reservation",
        JSON.stringify(data.inputValue),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleCancel = () => {
    return;
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="room-reservation">
          <h1
            style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}
          >
            Room Reservation
          </h1>

          <div className="room_reserve_section">
            <form onSubmit={handleFormSubmit}>
              <div>
                <div className="elem-group">
                  <label htmlFor="room">Room</label>
                  <select
                    name="room_id"
                    value={inputValue.room_id}
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
                    value={inputValue.title}
                    onChange={handleInputChange}
                    placeholder="To meet with the client"
                  />
                </div>

                <div className="elem-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={inputValue.description}
                    onChange={handleInputChange}
                    placeholder="Agenda"
                    required
                  />
                </div>

                <div className="elem-group inlined">
                <label htmlFor="time">Time</label>
                  <select
                    name="start_time"
                    value={inputValue.start_time}
                    onChange={handleSelectChange}
                  >
                    <option>--Start Time---</option>
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
                    value={inputValue.end_time}
                    onChange={handleSelectChange}
                  >
                    <option>--End Time--</option>
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
                    min={minDate}
                    value={inputValue.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit">Book Now</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomReservationForm;
