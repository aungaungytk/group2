import React, { useState } from 'react'
import { Sidebar } from '../sidebar/AdminSidebar';
import Navbar from '../navbar/navbar';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


interface CarData {
  id: number;
  brand: string;
  licence_no: string;
  capacity: number;

}
const CreateCar = () => {
  const navigate = useNavigate();
  const [open,setOpen]=useState(false);
  const [inputValue,setInputValue]=useState<CarData>({
    id:0,
    brand:"",
    capacity:0,
    licence_no:"",

  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  const handleCreate=(e:any)=>{
    sendDataToBackend({ inputValue });
    navigate(-1);
  }
  
    const sendDataToBackend = (data: { inputValue: CarData }) => {
      fetch(`http://127.0.0.1:8000/api/cars`, {
        method: "POST",
        body: JSON.stringify(inputValue),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  const onBackDropClick=()=>{
    setOpen(false);
  };
  return (
    <div className='home'>
        <Sidebar />
        <div className="homeContainer">
            <Navbar />
            <div>
               <form>
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
              onClick={handleCreate}
              variant="contained"
              color="primary"
              size="small"
            >
              Create
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
               </form>
            </div>
            
        </div>
    </div>
);
}

export default CreateCar
