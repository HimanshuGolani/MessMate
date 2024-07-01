import express from "express";
import "dotenv/config";
import connectionWithDb from "./Database_Connect/connectionWithDb.js";
// initializing APP
const app = express();

const PORT = process.env.PORT || 5001;

// seting up middle wears
app.use(express.json());

// connecting to mongoDb
connectionWithDb();

// starting the app
app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
