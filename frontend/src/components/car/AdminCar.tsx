import Switch from "@mui/material/Switch/Switch";
import DataTable, { TableColumn } from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useAppSelector } from "../../redux/features/Hook";
import axios from "axios";

interface DataRow {
  id: number;
  date: string;
  title: string;
  start_time: string;
  end_time: string;
  destination: string;
  no_of_traveller: number;
  status: boolean;
  user: { id: number; name: string };
  car: { id: number; licence_no: string };
  remark: string;
  approved_by: string;
}

function AdminCarRequest(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  const [car, setCar] = useState<DataRow[]>([]);
//   const [formValues, setFormValues] = useState<DataRow>({
//     id: 0,
//   date: "",
//   title: "",
//   start_time: "",
//   end_time: "",
//   destination: "",
//   no_of_traveller: 0,
//   status: false,
//   user: { id: 0, name: "" },
//   car: { id: 0, licence_no: "" },
//   remark: "",
//   approved_by: "",
//   });
  useEffect(() => {
    getCarData().then((response: any) => {
      setCar(response.data);
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
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, row: DataRow) => {
    const { checked } = event.target;
  
    const updatedUser: DataRow = {
      ...row,
      status: checked,
    };
    console.log(row.id);
    axios
      .patch(`http://127.0.0.1:8000/api/car_reservation/${row.id}`, {
        date:updatedUser.date,
        title: updatedUser.title,
        start_time: updatedUser.start_time,
        end_time:updatedUser.end_time,
        destination: updatedUser.destination,
        user_id: updatedUser.user.id,
        car_id: updatedUser.car.id,
        no_of_traveller: updatedUser.no_of_traveller,
        status: checked,
        remark: updatedUser.remark,
        approved_by: updatedUser.approved_by,
        
      }, {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      })
      .then(() => {
        const updatedUsers = car.map((item) =>
          item.id === row.id ? updatedUser : item
        );
        setCar(updatedUsers);
        // console.log(updatedUser);
      })
      .catch((error) => {
        // console.log(updatedUser.team[0].id.valueOf());
        console.error("Error updating user status:", error);
      });
  };

  const columns = [
    {
      name: "Licence_no",
      selector: (row: DataRow) => row.car.licence_no,
    },
    {
      name: "Date",
      selector: (row: DataRow) => row.date,
    },
    {
      name: "Title",
      selector: (row: DataRow) => row.title,
    },
    {
      name: "Destination",
      selector: (row: DataRow) => row.destination,
    },
    {
      name: "Passenger_Count",
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
      },
      {
        name: "Status",
        cell: (row: DataRow) => <Switch checked={Boolean(row.status)} onChange={(event) => handleStatusChange(event,row)}/>,
      },
  ];
  return (
    <DataTable
      columns={columns}
      className={darkMode ? "darkTable" : ""}
      data={car}
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
  );
}

export default AdminCarRequest;

