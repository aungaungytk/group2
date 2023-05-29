import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import { Sidebar } from '../../components/sidebar/AdminSidebar';
import CarDataTable from '../../components/create/CarDataTable';

const CarCRUD = () => {
  return (
    <div className='home'>
        <Sidebar />
        <div className="homeContainer">
            <Navbar />
            <h1 style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}>Car Creation Page</h1>
            <div>
                <Link to="/car-create" style={{ display: "block", textAlign: "left", marginTop: "10px", marginLeft: "10px", cursor: "default" }}>
                    <Button size="medium" variant="contained" disableRipple>Add New</Button>
                </Link>
            </div>
            <CarDataTable/>
        </div>
    </div>
);
}

export default CarCRUD;
