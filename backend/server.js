import express from "express";
import cors from "cors";
import "./db.js";
import userRoutes from "./routes/userRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import otpRoutes from "./routes/OTPRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", userRoutes);
app.use("/", complaintRoutes);
app.get("/", (req,res)=>{
    res.send("Server Running");
});
app.use("/", otpRoutes);
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});


