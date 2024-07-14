import express from "express";
import "dotenv/config";
import connectionWithDb from "./Config/connectionWithDb.js"
import CustomerRouter from "./router/Customer-router.js";
import vendorRouter from "./router/Vender-router.js";
import commentRouter from "./router/Comment-router.js";
import mealCancelationRouter from "./router/MealCanelation-router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
<<<<<<< HEAD

=======
import fileUpload from "express-fileupload";
import cloudinaryConnect from "./Config/connectionWithCloudinary.js";
import Upload from "./router/FileUpload.js";
>>>>>>> imageUpload
// initializing APP
const app = express();

const PORT = process.env.PORT || 5001;

// seting up middle wears
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/temp/"
}));


// setting up routes
app.use("/api/v1/user", CustomerRouter);
app.use("/api/v1/vender", vendorRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/meal", mealCancelationRouter);
app.use('/api/v1/upload', Upload);
// connecting to mongoDb
connectionWithDb();

//connection with cloudinary
cloudinaryConnect();

// starting the app
app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
