import express from "express";

import {
    addComplaint,
    getAllComplaints,
    deleteComplaint,
    updateStatus
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/addComplaint", addComplaint);

router.get("/allComplaints", getAllComplaints);

router.delete("/deleteComplaint/:id", deleteComplaint);

router.put("/updateStatus/:id", updateStatus);

export default router;