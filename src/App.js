import { BrowserRouter,Navigate,Routes,Route, Router } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import AdminHome from "./adminScreens/adminHome"
import AdminLogin from "./adminScreens/adminLogin"


function App() {

const mode=useSelector((state)=>state.mode);
const theme =useMemo(()=>createTheme(themeSettings(mode)),[mode]);
const isAuth =Boolean(useSelector((state)=>state.token))
const isAdminAuthenticated = Boolean(localStorage.getItem('adminInfo'));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
            <Routes>

                <Route path="/"  element={isAuth ? <Navigate to="/home" /> : <LoginPage />}/>
                <Route path="/home" element={isAuth ?<HomePage/> : <Navigate to ='/'/>} />
                <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to = '/' />} />

        
                <Route path='/admin' element={isAdminAuthenticated ? <Navigate to= '/adminhome' /> : <AdminLogin/>}/>
                <Route path='/adminhome' element={isAdminAuthenticated ? <AdminHome/> : <Navigate to = '/admin' /> }/>

            </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
