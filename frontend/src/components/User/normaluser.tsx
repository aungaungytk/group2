import Button from "@mui/material/Button/Button";
import Switch from "@mui/material/Switch/Switch";
import DataTable, { TableColumn } from "react-data-table-component";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useAppSelector } from "../../redux/features/Hook";
import axios from "axios";
// import { DarkModeContext } from "./path/to/darkModeContext";

interface DataRow {
  team: { id: number; name: string }[];
  employee_id: string;
  name: string;
  password:string;
  email: string;
  roles: { id: number; name: string }[];
  phone: string;
  id: string;
  role_id:string;
  status: boolean ;
}

function NormalUser(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  const [isLoading,setIsLoading] = useState(true);
  const [user, setUser] = useState<DataRow[]>([]);
  const [formValues, setFormValues] = useState<DataRow>({
    employee_id: "",
    name: "",
    email: "",
    team: [],
    roles: [],
    role_id:"",
    password:"",
    phone: "",
    status: true,
    id: "",
  });
  useEffect(() => {
    getUserData().then((response: any) => {
      setUser(response.data);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);
  const getUserData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/staff", {
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
    axios
      .patch(`http://127.0.0.1:8000/api/users/${row.id}`, {
        name:updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        status:checked,
        team_id: updatedUser.team?.id,
        phone: updatedUser.phone,
        employee_id: updatedUser.employee_id,
        role_id: updatedUser.roles[0]?.id,
        
      }, {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      })
      .then(() => {
        const updatedUsers = user.map((item) =>
          item.id === row.id ? updatedUser : item
        );
        setUser(updatedUsers);
      })
      .catch((error) => {
        // console.log(updatedUser.team[0].id.valueOf());
        console.error("Error updating user status:", error);
      });
  };
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
      name: "Emp_id",
      selector: (row: DataRow) => row.employee_id,
    },
    {
      name: "Name",
      selector: (row: DataRow) => row.name,
    },
    {
      name: "Email",
      selector: (row: DataRow) => row.email,
    },
    {
      name: "Roles",
      selector: (row: DataRow) => row.roles,
      cell: (row: DataRow) => {
        const roleNames = row.roles.map((role) => role.name).join(", ");
        return <span>{roleNames}</span>;
      },
    },
    {
      name: "Phone",
      selector: (row: DataRow) => row.phone,
    },
    {
      name: "Team_Name",
      selector: (row: DataRow) => row.team,
      cell: (row: DataRow) => {
        // const teamNames = row.team((tea)=> tea.name).join(", ");
        return <span>{row.team.name}</span>;
        // console.log(row);
      },
    },
    {
      name: "Status",
      cell: (row: DataRow) => <Switch checked={Boolean(row.status)} onChange={(event) => handleStatusChange(event,row)} />,
    },
    {
      name: "Actions",
      cell: (row: DataRow) => (
        <Button
        onClick={(e: any) => {
          e.preventDefault();
          handleDelete(row.id);
        }}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <>
    {
      isLoading ? (
        <div style={{
          width: '80%',
          height: '50vh',
          position: 'fixed',
          background: 'rgba(0, 0, 0, 0.9) url("https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif") center no-repeat',
          backgroundColor:"white",
          zIndex: 1
        }}></div>
      ) :(
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
      )
    }
    
    </>
  );
}

export default NormalUser;
