import { Route, Routes } from "react-router-dom";
import MissionPage from "../pages/MissionPage";
import MissionList from "../pages/MissionList";
import Yeni from "../pages/Yeni";
import TasksPage from "../pages/TasksPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
function AppRouteList() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MissionPage />} />
        <Route path="/list" element={<MissionList />} />
        <Route path="/datagrid" element={<Yeni/>}/>
        <Route path="/tasks" element={<TasksPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </>
  );
}

export default AppRouteList;
