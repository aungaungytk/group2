import React, { useContext, useEffect, useState } from "react";
import { Button, Switch, Dialog, DialogContent } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { redirect, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { useAppSelector } from "../../redux/features/Hook";
// import { AuthRole } from "./redux/features/type/authType";

interface DataRow {
  name: string;
  capacity: number;
  amenities: string,
  id: number;
}

function AdminRoomComponent(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  // const [roomData,setRoomData] = useState<DataRow[]>([]);
  const [room, setRoom] = useState<DataRow[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [formValues, setFormValues] = useState<DataRow>({
    name: "",
    capacity: 0,
    amenities: "",
    id: 0,
  });

  const authRedux = useAppSelector((state) => state.auth);
  useEffect(() => {
    getRoomData().then((response: any) => {
      setIsUpdated(false);
      setRoom(response.data);
    });
  }, [isUpdated]);
  
  
  const getRoomData = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/rooms", {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
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
    const updatedRoom: DataRow = {
      ...formValues,
    };
  
    return new Promise<void>((resolve, reject) => {
      axios
        .patch(`http://127.0.0.1:8000/api/rooms/${formValues.id}`,{
          name:updatedRoom.name,
          capacity: updatedRoom.capacity,
          amenities: updatedRoom.amenities,

          }, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          const updatedRooms = room.map((item) =>
            item.id === formValues.id ? updatedRoom : item
          );
          // setUser(updatedUsers);
          setRoom(updatedRooms);
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
        .delete(`http://127.0.0.1:8000/api/rooms/${row}`, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          setRoom((prev) => prev.filter((item) => item.id !== row));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>, row: DataRow) => {
    const { name, value } = event.target;
    const newValue = value;

      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }));

      console.log(formValues);
    
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Name",
      selector: (row: DataRow) => row.name,
    },
    {
      name: "Capacity",
      selector: (row: DataRow) => row.capacity,
    },
    
    {
      name: "Amenity",
      selector: (row: DataRow) => row.amenities,
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
  
  function handleAdd() {
    setAddOpen(!addOpen);
  }

  function handleSave() {
    return new Promise<void>((resolve, reject) => {
      axios
        .post(`http://127.0.0.1:8000/api/rooms/`,{
          name: formValues.name,
          capacity: formValues.capacity,
          amenities: formValues.amenities,
          }, {
          headers: {
            Authorization: `Bearer ${authRedux.token}`,
          },
        })
        .then(() => {
          console.log("success");
          setIsUpdated(true);
          setAddOpen(!addOpen);
        })
        .catch((error) => {
          reject(error);
        });
    }); 
  }

  return (
    <>
      <Button
          style={{marginTop: "20px", marginLeft: "20px"}}
              variant="contained"
              color="primary"
              size="small"
              onClick={(e: any) => {
                e.preventDefault();
                handleAdd();
              }}
            >Add New Room</Button>
      <DataTable
        columns={columns}
        className={darkMode ? "darkTable" : ""}
        data={room}
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
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formValues.capacity}
            onChange={handleFormChange}
          />

          <label htmlFor="amenities">Amenity</label>
          <input
            type="string"
            name="amenities"
            value={formValues.amenities}
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


    <Dialog open={addOpen} onClose={() => setAddOpen(!addOpen)}>
        <DialogContent>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={handleFormChange}
          />
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            name="capacity"
            onChange={handleFormChange}
          />

          <label htmlFor="amenities">Amenity</label>
          <input
            type="string"
            name="amenities"
            onChange={handleFormChange}
          />

          <div>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              size="small"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
    </>
  );
}

export default AdminRoomComponent;
