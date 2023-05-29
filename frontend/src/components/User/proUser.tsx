/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { Button, Switch, Dialog, DialogContent } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
interface DataRow {
  team: { id: number; name: string }[];
  employee_id: string;
  name: string;
  password:string;
  email: string;
  roles: { id: number; name: string }[];
  phone: string;
  id:number;
  role_id:string;
  status: boolean ;
}

function ProUser(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState<DataRow[]>([]);
  const [role, setRole] = useState<string>("");
  const [user, setUser] = useState<DataRow[]>([]);
  const [roleList,setRoleList] = useState<{id:number; name:string}[]>([]);
  const [teamName, setTeamName] = useState("");
  const [teamList, setTeamList] = useState<{ id: number; name: string }[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
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
    id: 0,
  });
  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    getUserData().then((response: any) => {
      setIsUpdated(false);
      setUser(response.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);
  useEffect(() => {
    getTeamData().then((response: any) => {
      // console.log(response.data);
      setTeamList(response.data);
    });
  },[]);
  const getTeamData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/teams", {
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
  useEffect(() => {
    getRoleData().then((response: any) => {
      setRoleList(response.data);
    });
  },[]);
  const getRoleData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/roles", {
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

  const getUserData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/pro_user", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  const handleEdit = (row: DataRow) => {
    setFormValues({ ...row });
    setOpen(true);
  };
  const handleUpdate = () => {
    const updatedUser: DataRow = {
      ...formValues,
      roles: [
        {
          id: parseInt(role, 10),
          name: roleList.find((r) => r.id === parseInt(role, 10))?.name || "",
        },
      ],
      team: [
        {
          id: parseInt(teamName, 10),
          name: teamList.find((t) => t.id === parseInt(teamName, 10))?.name || "",
        },
      ],
    };
  
    return new Promise<void>((resolve, reject) => {
      axios
        .patch(`http://127.0.0.1:8000/api/users/${formValues.id}`,{
          name:updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          status:updatedUser.status,
          team_id: updatedUser.team[0].id,
          phone: updatedUser.phone,
          employee_id: updatedUser.employee_id,
          role_id: updatedUser.team[0].id,

          }, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          const updatedUsers = user.map((item) =>
            item.id === formValues.id ? updatedUser : item
          );
          // setUser(updatedUsers);
          setUser(updatedUsers);
          setOpen(false);
          setIsUpdated(true);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  

  const handleDelete = (row: number) => {
    return new Promise<void>((resolve, reject) => {
      axios
        .delete(`http://127.0.0.1:8000/api/users/admin_delete/${row}`, {
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

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, row: DataRow) => {
    const { checked } = event.target;
  
    const updatedUser: DataRow = {
      ...row,
      status: checked,
    };
    axios
      .patch(`http://127.0.0.1:8000/api/status_change/${row.id}`, {
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
        console.error("Error updating user status:", error);
      });
  };
  
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>, row: DataRow) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "roles") {
      const updatedRoles = [
        {
          id: formValues.roles[0].id,
          name: newValue.toString(),
        },
      ];

      setFormValues((prevValues) => ({
        ...prevValues,
        roles: updatedRoles,
      }));
    }
    if (name === "team") {
      const updatedTeam = [
        {
          id: formValues.team[0].id,
          name: newValue.toString(),
        },
      ];

      setFormValues((prevValues) => ({
        ...prevValues,
        team: updatedTeam,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }));
    }
  };

  const columns: TableColumn<DataRow>[] = [
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
      name: "Role",
      selector: (row: DataRow) => row.roles[0].name,
      cell: (row: DataRow) => {
        return <span>{row.roles[0].name}</span>;
        
      },
    },
    {
      name: "Phone_no",
      selector: (row: DataRow) => row.phone,
    },
    {
      name: "Team_Name",
      cell: (row: DataRow) => <span>{row.team.name}</span>,
    },
    {
      name: "Status",
      cell: (row: DataRow) => <Switch checked={Boolean(row.status)} onChange={(event) => handleStatusChange(event,row)} />,
    },
    {
      name: "Actions",
      cell: (row: DataRow) => (
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
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];
  // console.log();
  return (
    <>
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleFormChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleFormChange}
          />
          <div className="role">
            <select
              className="option"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roleList.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="phone">Phone_no:</label>
          <input
            type="number"
            name="phone"
            value={formValues.phone}
            onChange={handleFormChange}
          />
          <div className="team">
            <select
              className="option"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            >
              {teamList &&
                teamList.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
          <label htmlFor="status">Status:</label>
          <input
            type="checkbox"
            name="status"
            checked={formValues.status}
            onChange={handleFormChange}
          />

          <div>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              size="small"
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProUser;
