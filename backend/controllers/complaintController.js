import ComplaintModel from "../models/ComplaintModel.js";
import transporter from "../config/mailConfig.js";
export const addComplaint = async (req, res) => {

  try {

    const {
      title,
      category,
      description,
      location,
      studentName,
      email
    } = req.body;

    if (
      !title ||
      !category ||
      !description ||
      !location ||
      !studentName ||
      !email
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const complaint = await ComplaintModel.create(req.body);

    res.json(complaint);

  }

  catch (error) {

    console.log(error);

    res.status(500).json(error);

  }

};


export const getAllComplaints = async (req, res) => {

    try {

        const complaints = await ComplaintModel.find();

        res.json(complaints);

    }

    catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

};


export const deleteComplaint = async (req, res) => {

    try {

        await ComplaintModel.findByIdAndDelete(req.params.id);

        res.json("Complaint Deleted");

    }

    catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

};


export const updateStatus = async (req, res) => {

    try {

        const complaint = await ComplaintModel.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        complaint.status = req.body.status;

        await complaint.save();

        await transporter.sendMail({

            from: "testxcms@gmail.com",
            to: complaint.email,

            subject: "Complaint Status Updated",

            text: `Hello ${complaint.studentName},

            Your complaint "${complaint.title}" has been updated.

            Current Status: ${complaint.status}

            Thank you,
            CCMS Team`

        });

        res.json("Status Updated");

    }

    catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

};