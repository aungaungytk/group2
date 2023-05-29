import { Routes, Route, Navigate } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import AuthProvider from "./redux/authProvider";
import { useAppSelector } from "./redux/features/Hook";
import { AuthRole } from "./redux/features/type/authType";
import Register from "./page/register/register";
import Error404 from "./page/error/Error404";
import AdminView from "./page/admin/AdminView";
import UserView from './page/user/UserView';
import Login from "./page/login/login";
import { Profile } from "./page/profile/profile";
import CarStatusUpdate from "./components/car/AdminCar";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const authRedux = useAppSelector((state) => state.auth);
  return (
    
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <Routes>
          <Route path="/adminCar" element={<CarStatusUpdate/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Error404 />} />
          {
            authRedux.role === AuthRole.Superadmin && (
            <Route
              path="SuperAdmin-dashboard/*"
              element={<AdminView />}
            />
          )}
          {
            authRedux.role === AuthRole.Superadmin && (
              <Route path="/personal-profile" element={<Profile />} />

          )}
          {authRedux.role === AuthRole.staff  && (
              <Route
                path="Staff-dashboard/*"
                element={<UserView />}
              />
            )}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
