import Button from "@mui/material/Button/Button";
import Switch from "@mui/material/Switch/Switch";
import DataTable, { TableColumn } from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useAppSelector } from "../../redux/features/Hook";
import axios from "axios";
// import { DarkModeContext } from "./path/to/darkModeContext";

interface DataRow {
  car:{id:number,licence_no:string},
  date: string;
  title: string;
  carno: string;
  destination: string;
  no_of_traveller: string;
  start_time: string;
  end_time: string;
  status: boolean;
  user: { id: number; name: string; team: { id: number; name: string } };
}

function TableCar(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<DataRow[]>([]);
  const [formValues, setFormValues] = useState<DataRow>({
    car:{id:0, licence_no:""},
    date: "",
    title: "",
    carno: "",
    destination: "",
    no_of_traveller: "",
    start_time: "",
    end_time: "",
    status: false,
    user: { id: 0, name: "", team: { id: 0, name: "" } },
  });
  useEffect(() => {
    getUserData().then((response: any) => {
      setUser(response.data);
    });
  }, []);
  const getUserData = () => {
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
  // const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, row: DataRow) => {
  //   const { checked } = event.target;

  //   const updatedUser: DataRow = {
  //     ...row,
  //     status: checked,
  //   };
  //   axios
  //     .patch(`http://127.0.0.1:8000/api/users/${row.id}`, {
  //       name:updatedUser.name,
  //       email: updatedUser.email,
  //       password: updatedUser.password,
  //       status:checked,
  //       team_id: updatedUser.team?.id,
  //       phone: updatedUser.phone,
  //       employee_id: updatedUser.employee_id,
  //       role_id: updatedUser.roles[0]?.id,

  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${authRedux.token}`,
  //       },
  //     })
  //     .then(() => {
  //       const updatedUsers = user.map((item) =>
  //         item.id === row.id ? updatedUser : item
  //       );
  //       setUser(updatedUsers);
  //     })
  //     .catch((error) => {
  //       // console.log(updatedUser.team[0].id.valueOf());
  //       console.error("Error updating user status:", error);
  //     });
  // };
  const handleDelete = (row: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/users/user_delete/${row}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          setUser((prevUser) => prevUser.filter((item) => item.id !== row));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const columns = [
    {
      name: "Licence_No",
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
      name: "Start_Time",
      selector: (row: DataRow) => row.start_time,
    },
    {
      name: "End_Time",
      selector: (row: DataRow) => row.end_time,
    },
    {
      name: "Requerted_User",
      selector: (row: DataRow) => row.user.name,
      // cell: (row: DataRow) => {
      //   // const teamNames = row.team((tea)=> tea.name).join(", ");
      //   return <span>{row.team.name}</span>;
      //   // console.log(row);
      // },
    },
    {
      name: "Team_Name",
      cell: (row: DataRow) => row.user.team.name,
    },
    {
      name: "Status",
      cell: (row: DataRow) =>
        row.status == true ? (
          <Button variant="contained" color="success">
            Success
          </Button>
        ) : (
          <Button variant="contained" color="warning">
            Pending
          </Button>
        ),
    },
  ];
  return (
    <DataTable
      columns={columns}
      className={darkMode ? "darkTable" : ""}
      data={user}
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

export default TableCar;
