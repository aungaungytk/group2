import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import SearchComponent from "../search/search";
interface DataRow {
  // name:string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  car: any;
  id: number;
  date: string;
  title: string;
  start_time: string;
  end_time: string;
  description: string;
  room: { id: number; name: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: { id: number; name: string; team: any };
}

function RoomReservationReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [roomData, setRoomData] = useState<DataRow[]>([]);
  const [filterText, setFilterText] = useState("");
  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getRoomData().then((response: any) => {
      console.log(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getRoomData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/room_reservation", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setRoomData(response.data.data);
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };

  const columns: TableColumn<DataRow>[] = useMemo(
    () => [
      {
        name: "Id",
        selector: (row: DataRow) => row.id,
      },
      {
        name: "Date",
        selector: (row: DataRow) => row.date,
      },
      {
        name: "Room Name",
        selector: (row: DataRow) => row.room.name,
      },
      {
        name: "Title",
        selector: (row: DataRow) => row.title,
      },
      {
        name: "Description",
        selector: (row: DataRow) => row.description,
        cell: (row: DataRow) => (
          <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {row.description}
          </div>
        ),
      },
      {
        name: "Start_Time",
        selector: (row: DataRow) => row.start_time,
      },
      {
        name: "End_Time",
        selector: (row: DataRow) => row.end_time,
      },
      {
        name: "Requested_User",
        selector: (row: DataRow) => row.user.name,
      },
      {
        name: "Team_Name",
        selector: (row: DataRow) => row.user.team.name,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filterText.trim() === "") {
      return roomData;
    } else {
      return roomData.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item.date.toString().includes(searchText) ||
          item.title.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.room.name.toLowerCase().includes(searchText) ||
          item.end_time.toString().toLowerCase().includes(searchText) ||
          item.start_time.toString().toLowerCase().includes(searchText) ||
          item.user.team.name.toLowerCase().includes(searchText) ||
          item.user.name.toLowerCase().includes(searchText)
        );
      });
    }
  }, [roomData, filterText]);

  const handleFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleClearFilter = () => {
    setFilterText("");
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ margin: "15px", fontSize: "30px" }}>
          Room Reservation List Report
        </h1>
        <SearchComponent
          onFilter={handleFilterTextChange}
          onClear={handleClearFilter}
          filterText={filterText}
        />
      </div>

      <DataTable
        columns={columns}
        className={darkMode ? "darkTable" : ""}
        data={filteredData}
        theme="solarized"
        style={{ maxWidth:"700px" }}
        pagination
        customStyles={{
          table: {
            style: {
              backgroundColor: "#000",
            },
          },
        }}
      />
    </>
  );
}

export default RoomReservationReport;
