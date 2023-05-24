import { Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
