import UserModel from "../models/userModel.js";
export const login = async (req, res) => {

    try {

        const user = await UserModel.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if(user){
            res.json(user);
        }

        else{
            res.status(404).json("Invalid Credentials");
        }

    }

    catch(error){

        console.log(error);

        res.status(500).json(error);

    }

}

export const register = async (req, res) => {

  try {

    const existingUser = await UserModel.findOne({
      email: req.body.email
    });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already registered"
      });

    }

    const user = await UserModel.create(req.body);

    res.json(user);

  }

  catch (error) {

    console.log(error);

    res.status(500).json(error);

  }

};

export const getProfile = async (req, res) => {

    try {

        const user = await UserModel.findOne({
            name: req.params.name
        });

        res.json(user);

    }

    catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

};

export const updateProfile = async (req, res) => {

  try {

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(user);

  }

  catch (error) {

    console.log(error);

    res.status(500).json(error);

  }

};

export const getStudents = async (req, res) => {

  try {

    const students = await UserModel.find({
      role: "student"
    });

    res.json(students);

  }

  catch (error) {

    console.log(error);

    res.status(500).json(error);

  }

};

export const deleteStudent = async (req, res) => {

  try {

    await UserModel.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Student Deleted"
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json(error);

  }

};

export const resetPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.password = newPassword;

        await user.save();

        res.json({
            message: "Password Updated Successfully"
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json(error);

    }

};