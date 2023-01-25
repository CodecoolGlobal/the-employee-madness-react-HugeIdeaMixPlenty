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

employeeRouter.get("/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

//--------------------GET ALL ROBERTS------------------------
employeeRouter.get("/name/robert", async (req, res) => {
  const roberts = await EmployeeModel.find({
    name: { $regex: "robert", $options: "i" },
  });
  return res.json(roberts);
});

//------------------------------------------------------

employeeRouter.get("/id/:id", (req, res) => {
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
