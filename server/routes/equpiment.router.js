const express = require("express");
const EquipmentModel = require("../db/equipment.model");
const equipmentRouter = express.Router();
const url = require("url");

equipmentRouter.use("/id/:id", async (req, res, next) => {
  let equipment = null;

  try {
    equipment = await EquipmentModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!equipment) {
    return res.status(404).end("Equipment not found");
  }

  req.equipment = equipment;
  next();
});

//----------------------TEST NAME----------------------
equipmentRouter.get("/fedora", async (req, res) => {
  const fedora = await EquipmentModel.find({
    name: { $regex: "Fedora", $options: "i" },
  });
  return res.json(fedora);
});

equipmentRouter.get("/start", async (req, res) => {
  const equipment = await EquipmentModel.find().sort({ created: "desc" });
  return res.json(equipment);
});

//----------Filter for Level or Position------------
// equipmentRouter.get("/gettypeoramount/typeoramount", async (req, res) => {
//   let webanfrage = url.parse(req.url, true);
//   let typeOrAm = webanfrage.query["typeOrAm"];
//   if (typeOrAm === undefined) {
//     typeOrAm = "";
//   }
//   typeOrAm = typeOrAm.trim();
//   console.log("isNan", isNaN(typeOrAm));
//   if (!isNaN(typeOrAm)) {
//     typeOrAm = Number(typeOrAm);
//     console.log(typeof typeOrAm);
//   }

//   const typePart = await EquipmentModel.find({
//     type: { $regex: `^${typeOrAm}$`, $options: "i" },
//   });

//   const amPart = await EquipmentModel.aggregate([
//     { $match: { amount: typeOrAm } },
//   ]);
//   return res.json([...amPart, ...typePart]);
// });

//---------------SORT Asc/Desc------------------------------

// equipmentRouter.get("/", async (req, res) => {
//   console.log("entering equipment");
//   let webanfrage = url.parse(req.url, true);
//   let sortBy = webanfrage.query["sortby"];
//   if (sortBy === undefined || sortBy === "") {
//     sortBy = "name";
//   }
//   let orderBy = parseInt(webanfrage.query["orderby"]);
//   if (orderBy !== -1 && orderBy !== 1) {
//     orderBy = 1;
//   }

//   sortBy = sortBy.toLowerCase();
//   console.log(`sortBy = '${sortBy}'`);
//   console.log("orderBy", orderBy);

//   const equipment = await EquipmentModel.find().sort({ [sortBy]: orderBy });
//   return res.json(equipment);
// });

//----------------------------------------------------------

equipmentRouter.get("/id/:id", (req, res) => {
  console.log("entering equipment:id");
  return res.json(req.equipment);
});

equipmentRouter.post("/", async (req, res, next) => {
  const equipment = req.body;

  try {
    const saved = await EquipmentModel.create(equipment);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

equipmentRouter.patch("/id/:id", async (req, res, next) => {
  const equipment = req.body;

  try {
    const updated = await req.equipment.set(equipment).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

equipmentRouter.delete("/id/:id", async (req, res, next) => {
  try {
    const deleted = await req.equipment.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = equipmentRouter;
