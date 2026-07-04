import transporter from "../config/mailConfig.js";
import otpStore from "../utils/otpStore.js";

export const sendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        otpStore[email] = otp;

        await transporter.sendMail({
            from: "testxcms@gmail.com",
            to: email,
            subject: "CCMS Email Verification",
            text: `Your OTP is ${otp}`
        });

        res.json({
            message: "OTP Sent Successfully"
        });

    } catch (error) {

        console.log(error);
        res.status(500).json(error);

    }

};

export const verifyOTP = (req, res) => {

    const { email, otp } = req.body;

    if (!otpStore[email]) {
        return res.status(400).json({
            message: "OTP Expired or Not Found"
        });
    }

    if (otpStore[email] != otp) {
        return res.status(400).json({
            message: "Invalid OTP"
        });
    }

    delete otpStore[email];

    res.json({
        message: "OTP Verified Successfully"
    });

};