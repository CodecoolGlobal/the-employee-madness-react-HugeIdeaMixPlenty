import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EmployeeTable from "../../Components/EmployeeTable";

//_________NOW DEPRECATED__________________
// const fetchEmployees = (signal) => {
//   console.log("running fetch employees");
//   return fetch("/api/employees", { signal }).then((res) => res.json());
// };

const fetchFilteredEmployees = (signal, select = "created", arrange = -1) => {
  console.log("running fetch filtered employees");
  return fetch(`/api/employees?sortby=${select}&orderby=${arrange}`, {
    signal,
  }).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/id/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("");
  const [arrange, setArrange] = useState("1");
  const [select, setSelect] = useState("name");

  const handleChangeSelect = (event) => {
    setSelect(event.target.value);
  };

  const handleChangeArrange = (event) => {
    setArrange(event.target.value);
  };

  const handleClickGoButton = () => {
    console.log("running Go Button function");
    setSelect(select);
    setArrange(arrange);
    fetchFilteredEmployees(undefined, select, arrange).then((employees) =>
      setData(employees)
    );
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleClickFilter = () => {
    setFilter(filter);
  };

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });
    setData((employees) => {
      console.log(employees);
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchFilteredEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable
      employees={data}
      onDelete={handleDelete}
      handleChangeFilter={handleChangeFilter}
      handleClickFilter={handleClickFilter}
      filter={filter}
      arrange={arrange}
      handleChangeArrange={handleChangeArrange}
      select={select}
      handleChangeSelect={handleChangeSelect}
      handleClickGoButton={handleClickGoButton}
    />
  );
};

export default EmployeeList;
