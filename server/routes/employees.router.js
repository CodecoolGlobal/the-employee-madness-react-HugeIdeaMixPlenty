const express = require("express");
const EmployeeModel = require("../db/employee.model");
const employeeRouter = express.Router();
const url = require("url");

employeeRouter.use("/id/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

//--------------------GET ALL ROBERTS------------------------
employeeRouter.get("/name/robert", async (req, res) => {
  const roberts = await EmployeeModel.find({
    name: { $regex: "robert", $options: "i" },
  });
  return res.json(roberts);
});

//----------------Filter for Level or Position---------------
employeeRouter.get("/getLevelOrPosition/levelOrPos", async (req, res) => {
  let webanfrage = url.parse(req.url, true);
  let levelOrPos = webanfrage.query["levelOrPos"];
  if (levelOrPos === undefined) {
    levelOrPos = "";
  }

  //MONGO DB Operators:
  const levelANDposition = await EmployeeModel.find({
    $or: [
      { level: { $regex: levelOrPos, $options: "i" } },
      { position: { $regex: levelOrPos, $options: "i" } },
    ],
  });

  // .sort({ name: 1 });
  // .limit(5);

  //----------for not included in field---------------------
  // const levelANDposition = await EmployeeModel.find({
  //   level: { $ne: levelOrPos },
  // });
  //--------------------------------------------------------
  return res.json(levelANDposition);
});

employeeRouter.get("/", async (req, res) => {
  console.log("entering employees");
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

  const employees = await EmployeeModel.find().sort({ [sortBy]: orderBy });
  return res.json(employees);
});

employeeRouter.get("/id/:id", (req, res) => {
  console.log("entering employees:id");
  return res.json(req.employee);
});

employeeRouter.post("/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

employeeRouter.patch("/id/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

employeeRouter.delete("/id/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = employeeRouter;
