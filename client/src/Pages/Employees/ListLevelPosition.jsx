import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EmployeeTable from "../../Components/EmployeeTable/EmployeeTable";
import { useParams } from "react-router-dom";

const fetchlevelOrPos = (levelOrPos) => {
  return fetch(
    `/api/employees/getLevelOrPosition/levelOrPos?levelOrPos=${levelOrPos}`,
    {
      levelOrPos,
    }
  ).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/id/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const ListLevelPosition = () => {
  const { levelOrPos } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchlevelOrPos(levelOrPos)
      .then((levelOrPoss) => {
        setLoading(false);
        setData(levelOrPoss);
      })
      .catch((error) => {
        if (error.levelOrPos !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, [data, levelOrPos]);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={data} onDelete={handleDelete} />;
};

export default ListLevelPosition;
