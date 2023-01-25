require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeeRouter = require("./routes/employees.router.js");
const equipmentRouter = require("./routes/equpiment.router.js");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.use("/api/employees", employeeRouter);
app.use("/api/equipment", equipmentRouter);

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
    console.log("Also try /api/equipment/ route right now - IT'S NEW!");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
