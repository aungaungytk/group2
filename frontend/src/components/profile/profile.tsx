import './profile.css';
import { useAppSelector } from "../../redux/features/Hook";
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    employee_id: string;
    phone: string;
    team: {id:number, name: string};
  }
export default function PersonalProfile() {
  const authRedux = useAppSelector((state) => state.auth);
  const authUser = authRedux.user.id;

  const [user, setUser] = useState<User>({
      name: '',
      id: 0,
      email: "",
      employee_id: "",
      phone: "",
      team: {id: 0, name:""},


  });
  
  useEffect(() => {
    getUser().then((response: any) => {
      setUser(response.data);
    })
  }, []);


  const getUser = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://127.0.0.1:8000/api/users/${authUser}`, {
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
  
  return (
    <>
    <div className='profile-card'>
      <div className='left-col'>
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
        alt="Avatar" className="profile-avartar"/>
        <div className='profile-name'>{user.name}</div>
        <div className='profile-team'>{user.team.name}</div>
        
      </div>
      <div className='right-col'>
        <div className='profile-information'>Information</div>
        <hr style={{width: "380px"}}/>
        <div className='profile-emp-group'>
          <div className='profile-emp-id'>Employee ID</div>
          <div className='profile-value-id'>{user.employee_id}</div>
        </div>
        <div className='profile-email-group'>
          <div className='profile-email'>Email</div>
          <div className='profile-value-email'>{user.email}</div>
        </div>
        <div className='profile-phone-group'>
          <div className='profile-phone'>Phone</div>
          <div className='profile-value-phone'>{user.phone}</div>
        </div>
      </div>
    </div>
    </>
  );
}