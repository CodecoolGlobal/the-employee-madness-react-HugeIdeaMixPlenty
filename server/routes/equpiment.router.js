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

// equipmentRouter.get("/start", async (req, res) => {
//   const equipment = await EquipmentModel.find().sort({ created: "asc" });
//   return res.json(equipment);
// });

//----------------------TEST NAME----------------------
equipmentRouter.get("/fedora", async (req, res) => {
  const fedora = await EquipmentModel.find({
    name: { $regex: "Fedora", $options: "i" },
  });
  return res.json(fedora);
});

//----------Filter for Level or Position------------
equipmentRouter.get("/gettypeoramount/typeoramount", async (req, res) => {
  let webanfrage = url.parse(req.url, true);
  let typeOrAm = webanfrage.query["typeOrAm"];
  if (typeOrAm === undefined) {
    typeOrAm = "";
  }
  typeOrAm = typeOrAm.trim();
  console.log("isNan", isNaN(typeOrAm));
  if (!isNaN(typeOrAm)) {
    typeOrAm = Number(typeOrAm);
    console.log(typeof typeOrAm);
  }

  // console.log(EquipmentModel.schema);

  const typePart = await EquipmentModel.find({
    type: { $regex: `^${typeOrAm}$`, $options: "i" },
  });

  const amPart = await EquipmentModel.aggregate([
    { $match: { amount: typeOrAm } },
  ]);
  // amount: "2",
  // Number({ $regex: typeOrAm }),
  return res.json([...amPart, ...typePart]);
});

//-----------------------------------------------------

// //MONGO DB Operators:
// const typeANDamount = await EquipmentModel.find({
//   $or: [
//     { type: { $regex: typeOrAm, $options: "i" } },
//     { amount: { $toInt: 2 } },
//   ],
// });
// return res.json(typeANDamount);

// // .sort({ name: 1 });
// // .limit(5);

// // ----------for "not" included in field------------------
// // const typeANDamount = await EquipmentModel.find({
// //   type: { $ne: typeOrAm },
// // });
// // --------------------------------------------------------

//---------------SORT Asc/Desc------------------------------

equipmentRouter.get("/", async (req, res) => {
  console.log("entering equipment");
  let webanfrage = url.parse(req.url, true);
  let sortBy = webanfrage.query["sortby"];
  if (sortBy === undefined || sortBy === "") {
    sortBy = "name";
  }
  let orderBy = parseInt(webanfrage.query["orderby"]);
  if (orderBy !== -1 && orderBy !== 1) {
    orderBy = 1;
  }
  // get query from req.url
  // let sortBy = webanfrage.query("sortby")
  // ... same for order
  /// wenn sortby leer: dann sortby name
  /// wenn order leer: dann sortby asc
  sortBy = sortBy.toLowerCase();
  console.log(`sortBy = '${sortBy}'`);
  console.log("orderBy", orderBy);

  const equipment = await EquipmentModel.find().sort({ [sortBy]: orderBy });
  return res.json(equipment);
});

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
