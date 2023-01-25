import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => (
  <div className="EmployeeTable">
    <br></br>
    <hr></hr>
    <table>
      <thead>
        <tr>
          <th>
            <h3>Name</h3>
          </th>
          <th>
            <h3>Level</h3>
          </th>
          <th>
            <h3>Position</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/employees/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
