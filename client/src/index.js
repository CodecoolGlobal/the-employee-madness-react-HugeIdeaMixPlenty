import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/Employees/EmployeeList";
import EquipmentList from "./Pages/Equipment/EquipmentList.jsx";
import EmployeeCreator from "./Pages/Employees/EmployeeCreator";
import EquipmentCreator from "./Pages/Equipment/EquipmentCreator";
import EmployeeUpdater from "./Pages/Employees/EmployeeUpdater";
import EquipmentUpdater from "./Pages/Equipment/EquipmentUpdater";
import ListRoberts from "./Pages/Employees/ListRoberts";
import ListTypeAmount from "./Pages/Equipment/ListTypeAmount";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/employees",
        element: <EmployeeList />,
      },
      {
        path: "/equipment",
        element: <EquipmentList />,
      },
      {
        path: "/employees/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/equipment/create",
        element: <EquipmentCreator />,
      },
      {
        path: "/employees/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/equipment/update/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/employees/robert",
        element: <ListRoberts />,
      },
      {
        path: "equipment/typeoramount/:typeOrAm",
        element: <ListTypeAmount />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
