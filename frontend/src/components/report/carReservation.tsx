import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
import SearchComponent from "../search/search";
import $ from 'jquery';
// import 'datatables.net-dt/css/jquery.dataTables.css';
interface DataRow {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  car: any;
  id: number;
  date: string;
  title: string;
  start_time: string;
  end_time: string;
  destination: string;
  no_of_traveller: number;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: { id: number; name: string; team: any };
  team: string;
  licence_no: string;
  approved_by: string;
}

function CarReservationReport(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [carData, setCarData] = useState<DataRow[]>([]);
  const [filterText, setFilterText] = useState("");
  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCarData().then(() => {
      // window.alert("Car data loaded successfully");
    });
  }, []);
  const getCarData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/car_reservation", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setCarData(response.data.data);
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
        name: "Date",
        selector: (row: DataRow) => row.date,
        style:{
          width:"30px"
        }
      },
      {
        name: "Licence No",
        selector: (row: DataRow) => row.car.licence_no,

      },
      {
        name: "Title",
        selector: (row: DataRow) => row.title,
        cell: (row: DataRow) => (
          <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {row.title}
          </div>
        ),
      },
      {
        name: "Destination",
        selector: (row: DataRow) => row.destination,
        cell: (row: DataRow) => (
          <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {row.destination}
          </div>
        ),
      },
      {
        name: "Passenger",
        selector: (row: DataRow) => row.no_of_traveller,
        
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
        style:{
          width:"400px"
        }
      },
      {
        name: "Team_Name",
        selector: (row: DataRow) => row.user.team.name,
      },
      {
        name: "Status",
        selector: (row: DataRow) => (row.status == 1 ? "success" : "pending"),
      },
      // {
      //   name: "Approved_By",
      //   selector: (row: DataRow) => row.approved_by,
      // },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filterText.trim() === "") {
      return carData;
    } else {
      return carData.filter((item) => {
        const searchText = filterText.toLowerCase();
        return (
          item.date.toString().includes(searchText) ||
          item.car.licence_no.toString().toLowerCase().includes(searchText) ||
          // item.approved_by.toString().toLowerCase().includes(searchText) ||
          item.car.toString().toLowerCase().includes(searchText) ||
          item.destination.toString().toLowerCase().includes(searchText) ||
          item.end_time.toString().toLowerCase().includes(searchText) ||
          item.start_time.toString().toLowerCase().includes(searchText) ||
          item.no_of_traveller.toString().includes(searchText) ||
          item.user.team.name.toLowerCase().includes(searchText) ||
          item.user.name.toString().toLowerCase().includes(searchText) ||
          item.title.toString().toLowerCase().includes(searchText)
        );
      });
    }
  }, [carData, filterText]);

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
          Car Reservation List Report
        </h1>
        <SearchComponent
          onFilter={handleFilterTextChange}
          onClear={handleClearFilter}
          filterText={filterText}
        />
      </div>
      <div style={{  maxWidth:"100%", overflowX:"auto" }}>
      <DataTable
        responsive
        columns={columns}
        className={darkMode ? "darkTable" : ""}
        data={filteredData}
        fixedHeaderScrollHeight="100px"
        theme="solarized"
        pagination
        customStyles={{
          table: {
            style: {

              // minWidth:"500px",
              maxWidth:"100%",
              
              backgroundColor: "#000",
              // overflowX:"auto",
            },
          },
          // cells: {
          //   style:{
          //     width:"70px"
          //   }
          // },
        }}
      />
      </div>
    
    </>
   
  );
}

export default CarReservationReport;
