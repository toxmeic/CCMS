import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    title: {
  type: String,
  required: true
},

category: {
  type: String,
  required: true
},

description: {
  type: String,
  required: true
},

location: {
  type: String,
  required: true
},

studentName: {
  type: String,
  required: true
},

status: {
  type: String,
  default: "Pending"
},

date: {
  type: Date,
  default: Date.now
},
email: {
  type: String,
  required: true
},
});

const ComplaintModel = mongoose.model("Complaint", complaintSchema);

export default ComplaintModel;