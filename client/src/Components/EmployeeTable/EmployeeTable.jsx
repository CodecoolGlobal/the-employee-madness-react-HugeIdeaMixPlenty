import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({
  employees,
  onDelete,
  handleChangeFilter,
  handleClickFilter,
  filter,
  handleChangeArrange,
  select,
  handleChangeSelect,
  handleClickGoButton,
}) => (
  <div className="EmployeeTable">
    <hr></hr>
    <div>
      <br></br>
      <input
        type="text"
        placeholder="Level or Position"
        id="filter"
        name="filter"
        onChange={handleChangeFilter}
        value={filter}
      />
      <Link to={`/employees/levelOrpos/${filter}`}>
        <button onClick={handleClickFilter}>
          Filter for position or level
        </button>
      </Link>
      <Link to={`/employees/`}>
        <button>Back</button>
      </Link>
    </div>
    <br></br>
    <div className="control">
      <label htmlFor="select">Arrange employees by: </label>
      <select onChange={handleChangeSelect} value={select} id="select">
        <option value="name">name</option>
        <option value="level">level</option>
        <option value="position">position</option>
      </select>
      <button onClick={handleClickGoButton}>GO!</button>
      <br></br>
      <label htmlFor="radio-1" className="radio">
        <input
          onChange={handleChangeArrange}
          value="1"
          type="radio"
          name="radio"
          id="radio-1"
          defaultChecked={true}
        />
        ascending
      </label>
      <label htmlFor="radio-2" className="radio">
        <input
          onChange={handleChangeArrange}
          value="-1"
          type="radio"
          name="radio"
          id="radio-2"
        />
        descending
      </label>
    </div>
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
