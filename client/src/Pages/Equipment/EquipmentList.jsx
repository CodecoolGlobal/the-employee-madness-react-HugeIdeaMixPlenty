import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EquipmentTable from "../../Components/EquipmentTable";

// const fetchEquipment = (signal) => {
//   console.log("running fetch equipment");
//   return fetch("/api/equipment/start", { signal }).then((res) => res.json());
// };

const fetchFilteredEquipment = (signal, select = "created", arrange = -1) => {
  console.log("running fetch filtered equipment");
  return fetch(`/api/equipment/?sortby=${select}&orderby=${arrange}`, {
    signal,
  }).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/id/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
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
    fetchFilteredEquipment(undefined, select, arrange).then((equipment) =>
      setData(equipment)
    );
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleClickFilter = () => {
    setFilter(filter);
  };

  const handleDelete = (id) => {
    deleteEquipment(id).catch((err) => {
      console.log(err);
    });
    setData((equipment) => {
      console.log(equipment);
      return equipment.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchFilteredEquipment(controller.signal)
      .then((equipment) => {
        setLoading(false);
        setData(equipment);
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
    <EquipmentTable
      equipment={data}
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

export default EquipmentList;
