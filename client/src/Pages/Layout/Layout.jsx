import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout" style={{ backgroundColor: "rgb(198, 218, 255)" }}>
    <nav>
      <ul>
        <li className="grow">
          <Link to="/employees">Employees & </Link>
          <Link to="/equipment">Equipment</Link>
        </li>
        <li>
          <Link to="/employees/create">
            <button type="button">Create Employee</button>
          </Link>
          <Link to="/equipment/create">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Willkommen beim Employee Madness!</h2>
    </div>
    <Outlet />
  </div>
);

export default Layout;
