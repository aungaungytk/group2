import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
interface DataRow {
  id: number;
  name: string;
}

function Team(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<DataRow[]>([]);
  const [team, setTeam] = useState<DataRow[]>([]);
  const [teamData, setTeamData] = useState<DataRow[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  // const [roleNames, setRoleNames] = useState<{ [key: number]: string }>({});
  const [formValues, setFormValues] = useState<DataRow>({
    id: 0,
    name: "",
  });
  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getTeamData().then((response: any) => {
      setIsUpdated(false);
      setTeam(response.data.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);
  const getTeamData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/teams", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          setTeamData(response.data.data);
          resolve(response.data);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: DataRow
  ) => {
    const { name, value } = event.target;
    const newValue = value;
    setFormValues((preValues) => ({
      ...preValues,
      [name]: newValue,
    }));
    console.log(formValues);
  };
  const handleCreate = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/teams",
        {
          name: formValues.name,
        },
        {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        }
      )
      .then(() => {
        setIsUpdated(true);
        setFormValues({ id: 0, name: "" });
        const formElement = document.getElementById("teamForm");
        if (formElement) {
          formElement.reset();
        }
      })
      .catch((error) => {
        console.error("Error creating team:", error);
      });
  };

  const handleEdit = (row: DataRow) => {
    setFormValues({ ...row });
    setOpen(true);
  };
  const handleUpdate = () => {
    const updatedUser: DataRow = {
      ...formValues,
    };

    return new Promise<void>((resolve, reject) => {
      axios
        .patch(
          `http://127.0.0.1:8000/api/teams/${formValues.id}`,
          {
            id: updatedUser.id,
            name:updatedUser.name,
          },
          {
            headers: {
              Authorization: `Bearer ${authRedux.token}`,
            },
          }
        )
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
        .delete(`http://127.0.0.1:8000/api/teams/${row}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          setUser((prevUser) => prevUser.filter((item) => item.id !== row));
          setIsUpdated(true);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Team_id",
      selector: (row: DataRow) => row.id,
    },
    {
      name: "Team_Name",
      selector: (row: DataRow) => row.name,
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  return (
    <>
      <form
        id="teamForm"
        style={{
          display: "flex",
          margin: "0 auto",
          width: "60%",
          marginBottom: "30px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <label
          htmlFor="name"
          style={{ marginTop: "20px", marginRight: "10px" }}
        >
          Create team Name:
        </label>
        <input
          type="text"
          name="name"
          key={formValues.id}
          onChange={handleFormChange}
          style={{
            width: "300px",
            height: "50px",
            marginTop: "5px",
            marginRight:"5px",
            border: "0.1px solid #000",
            boxShadow: "2px 2px 2px #000",
            borderRadius:"10px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ margin: " 10px 10px 0px 10px" }}
          type="submit"
        >
          Create Team
        </Button>
      </form>
      <DataTable
        columns={columns}
        className={darkMode ? "darkTable" : ""}
        data={teamData}
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
          <label htmlFor="status">Team Name:</label>
          <input
            key={formValues.id}
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleFormChange}
            style={{ marginTop:"20px", marginBottom:"20px" }}
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

export default Team;
