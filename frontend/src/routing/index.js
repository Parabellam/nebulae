import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "../components/menu-bar.component.js";
import EmployeesPage from "../pages/employees/employees.page.jsx";
import VehiclesPage from "../pages/vehicles/vehicles.page.jsx";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <ResponsiveAppBar />
        <div className="p-4">
          <Routes>
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/" element={<EmployeesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
