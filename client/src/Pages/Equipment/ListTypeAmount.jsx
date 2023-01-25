import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EquipmentTable from "../../Components/EquipmentTable/EquipmentTable";
import { useParams } from "react-router-dom";

const fetchtypeOrAmount = (typeOrAm) => {
  return fetch(
    `/api/equipment/gettypeoramount/typeoramount?typeOrAm=${typeOrAm}`,
    {
      typeOrAm,
    }
  ).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/id/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const ListTypeAmount = () => {
  const { typeOrAm } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(id).catch((err) => {
      console.log(err);
    });

    setData((equipment) => {
      return equipment.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchtypeOrAmount(typeOrAm)
      .then((typeOrAms) => {
        setLoading(false);
        setData(typeOrAms);
      })
      .catch((error) => {
        if (error.typeOrAm !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EquipmentTable equipment={data} onDelete={handleDelete} />;
};

export default ListTypeAmount;
