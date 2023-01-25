import { Link } from "react-router-dom";
import "./EquipmentTable.css";

const EquipmentTable = ({
  equipment,
  onDelete,
  // handleChangeFilter,
  // handleClickFilter,
  // filter,
  // handleChangeArrange,
  // select,
  // handleChangeSelect,
  // handleClickGoButton,
}) => (
  <div className="EquipmentTable">
    <hr></hr>
    {/* <div>
      <br></br>
      <input
        type="text"
        placeholder="Type or Amount"
        id="filter"
        name="filter"
        onChange={handleChangeFilter}
        value={filter}
      />
      <Link to={`/equipment/typeoramount/${filter}`}>
        <button onClick={handleClickFilter}>Filter for type or amount</button>
      </Link>
      <Link to={`/equipment/`}>
        <button>Back</button>
      </Link>
    </div>
    <br></br>
    <div className="control">
      <label htmlFor="select">Arrange equipment by: </label>
      <select onChange={handleChangeSelect} value={select} id="select">
        <option value="name">name</option>
        <option value="type">type</option>
        <option value="amount">amount</option>
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
    </div> */}
    <br></br>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th style={{ textAlign: "center" }}>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {equipment.map((equipment) => (
          <tr key={equipment._id}>
            <td>{equipment.name}</td>
            <td>{equipment.type}</td>
            <td style={{ textAlign: "center" }}>{equipment.amount}</td>
            <td>
              <Link to={`/equipment/update/${equipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equipment._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EquipmentTable;
