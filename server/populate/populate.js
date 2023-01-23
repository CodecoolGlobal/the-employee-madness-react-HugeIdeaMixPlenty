/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const name = require("./name.json");
const type = require("./type.json");
const amount = require("./amount.json");
const EmployeeModel = require("../db/employee.model");
const EquipmentModel = require("../db/equipment.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * from.length)];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});

  const equipment = name.map((name) => ({
    name,
    type: pick(type),
    amount: pick(amount),
  }));

  await EquipmentModel.create(...equipment);
  console.log("Equpiment created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();
  await populateEquipment();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
