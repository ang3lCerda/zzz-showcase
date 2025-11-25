import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="">
      <Navbar />
      <main className="p-6">
        <Outlet /> 
      </main>
    </div>
  );
}
