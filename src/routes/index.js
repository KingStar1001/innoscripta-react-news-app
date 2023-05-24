import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import News from "../components/pages/News";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../components/MainLayout";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route exact path="/" element={<PrivateRoute />}>
        <Route exact path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/news" />} />
          <Route path="/news" element={<News />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
