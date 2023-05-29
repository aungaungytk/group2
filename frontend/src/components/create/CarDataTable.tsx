import { Button, Dialog, DialogContent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import { useAppSelector } from "../../redux/features/Hook";
import { carData } from '../../components/dashboard_table/AdminCarReserveTable';
interface CarData {
  id: number;
  brand: string;
  licence_no: string;
  capacity: number;

}
const CarDataTable = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [carData,setCarData]=useState<CarData[]>([]);
  const [refresh,setRefresh]=useState(false);
  const [open,setOpen]=useState(false);
  const authToken=authRedux.token;
  const [inputValue,setInputValue]=useState<CarData>({
    id:0,
    brand:"",
    capacity:0,
    licence_no:"",

  })
  useEffect(() => {
    fetchCarList().then((response:any)=>{
      setCarData(response.data);
      setRefresh(false);
    });
    //sendDataToBackend();
  }, []);

  const fetchCarList = () => {
    return new Promise((resolve,reject)=>{
      axios
      .get('http://127.0.0.1:8000/api/cars')
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
          reject(error)      
      });
    }) 
  }
 
  const columns: TableColumn<CarData>[] = [
    {
      name: "ID",
      selector: (row: CarData) => row.id,
    },
    {
      name: "Brand/Model",
      selector: (row: CarData) => row.brand,
    },
    {
      name: "Licence Plate",
      selector: (row: CarData) => row.licence_no,
    },
    {
      name: "Capacity",
      selector: (row: CarData) => row.capacity,
    },
    
    {
      name: "Actions",
      cell: (row: CarData) => (
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
  const handleEdit = (data:CarData) =>
{
  setInputValue({...data});
  setOpen(true);
}

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setInputValue((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


const handleUpdate=(e:any)=>{
  sendDataToBackend();
  setOpen(false);
  setRefresh(true);
 
}

const sendDataToBackend = () => {
  const updatedCar: CarData = {
    ...inputValue,
  };

  axios
    .patch(`http://127.0.0.1:8000/api/cars/${inputValue.id}`, inputValue, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then(() => {
      const updatedCars = carData.map((item) =>
        item.id === inputValue.id ? updatedCar : item
      );
      setCarData(updatedCars);
      setOpen(false);
      setRefresh(true);
    })
    .catch((error) => {
      console.error(error);
    });
};

const onBackDropClick=()=>{
  setOpen(false);
};
const handleDelete = (id: number) => {
  return new Promise<void>((resolve, reject) => {
    axios
      .delete(`http://127.0.0.1:8000/api/cars/${id}`)
      .then(() => {
        setCarData((prevData) =>
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
    <>
      <DataTable
        columns={columns}
       // className={darkMode ? "darkTable" : ""}
        data={carData}
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
          <div>
          <label htmlFor="brand">Brand / Model:</label>
          <input
            type="text"
            name="brand"
            value={inputValue.brand}
            onChange={handleInputChange}
          />
          </div>         
         <div>
         <label htmlFor="licence_no">Licence No:</label>
          <input
            type="text"
            name="licence_no"
            value={inputValue.licence_no}
            onChange={handleInputChange}
          />
         </div>
          <div>
          <label htmlFor="Capacity">Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={inputValue.capacity}
            onChange={handleInputChange}
          />
          </div>
          <div>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              size="small"
            >
              Update
            </Button>
            <Button
            onClick={onBackDropClick}
              variant="contained"
              color="primary"
              size="small"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CarDataTable
