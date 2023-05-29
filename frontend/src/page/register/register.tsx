import React, { useEffect, useState } from "react";
import CustomPhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import { Link } from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import axios from "axios";
import AcePlus from "../../components/img/ACEPlus.png";
// import { Alert } from "@mui/material";
// import { useAppSelector } from "../../redux/features/Hook";
// import { AuthRole } from "./redux/features/type/authType";
import HowToRegIcon from '@mui/icons-material/HowToReg';
// import { const } from '../../redux/features/auth/authSlice';

interface Team {
  id: number;
  name: string;
}
const Register: React.FC= () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [status, setStatus] = useState(0);
  const [role, setRole] = useState(3);
  const [message,setMessage] = useState("");
  const [cfmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [teamList, setTeamList] = useState<[Team]>([{
    id: 0,
    name: "",
  }]);
  

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getTeams().then((response: any) => {
      setTeamList(response.data.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      axios
      .post("http://127.0.0.1:8000/api/register",{
          name: userName,
          email: email,
          employee_id: employee_id,
          password: password,
          status: status,
          team_id: teamName,
          role_id: role,
          phone: phone,
          password_confirmation: cfmPassword,
          
        },
      )
      .then(function (response) {
        setMessage(response.data.message);
        setAlert(true)
        // alert(response.data.message);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error) => {
        if(error.response && error.response.data){
          console.log(error.response.data.message);
        }
      });
      setUserName("");
      setEmail("");
      setConfirmPassword("");
      setPassword("");
      setTeamName("");
      setMessage("");
      setPhone("");
      setEmployeeId("");
    
  }

    

  const getTeams = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://127.0.0.1:8000/api/teams")
        .then((response) => {
          setTeamList(response.data.data);
        if (response.data.data.length > 0) {
          setTeamName(response.data.data[0].id.toString());
        }
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  };
  

// console.log(teamList);
// console.log(teamName);
  return (
    <div className="register">
    {/* <div style={{ display:"flex" , justifyContent:""}}>
    {alert && <Alert severity="success" >{message}</Alert>}
    </div> */}
    <div className="register_wrapper">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="txt-register"> <span style={{ marginTop:"3px" }}>Register Form</span> <HowToRegIcon fontSize="medium"/></div>
          <div className="name-group">
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
              required
            />
          </div>
          <div className="emaiil-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user.aceplus@gmail.com"
              required
            />
          </div>
          <div className="password-group">
            <input
              type="text"
              name="employeeId"
              value={employee_id}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="ACE-****"
              required
            />
          </div>

          <div className="phone-group">
            <CustomPhoneInput

              country="mm"
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </div>
          <div className="team-group">
          {teamList === null ? (
                <p>Loading teams...</p>
              ) : teamList.length === null ? (
                <p>No teams found</p>
              ) : (
                <select
                  className="team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                >
                  {teamList.map((team) => (
                    <option key={team.id} value={team.id.toString()}>
                      {team.name}
                    </option>
                  ))}
                </select>
              )}
          </div>
          <div className="password">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="confirmPassword">
            <input
              type="password"
              id="confirmPassword"
              name="cfm_Password"
              value={cfmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter confirm password"
              required
            />
          </div>
          {alert && <p style={{ color:"green" , marginTop:"10px", marginBottom:"10px", fontSize:"15px" }}>{message}</p>}
          <div className="submit">
            <button type="submit">Register Me</button>
          </div>
          <div className="txt-link">
            <span className="text">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div className="inner-wrapper">
        <div className="inner-right">
        <div style={{ marginTop: "0" }}>
              <img src={AcePlus} alt="" width={180} />
            </div>
            <div className="waviy">
              <span style={{ "--i": 1 } as React.CSSProperties}>OFFICE </span>
              <span style={{ "--i": 2 } as React.CSSProperties}>MEETING</span>
              <span style={{ "--i": 3 } as React.CSSProperties}>ROOM</span>
              <span style={{ "--i": 4 } as React.CSSProperties}>&</span>
              <span style={{ "--i": 5 } as React.CSSProperties}>CAR</span>
              <span style={{ "--i": 6 } as React.CSSProperties}>
                RESERVATION
              </span>
              <span style={{ "--i": 7 } as React.CSSProperties}>SYSTEM</span>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;