import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOTP, setShowOTP] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  function sendOTP() {

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);

    axios.post("http://localhost:3000/sendOTP", {
      email
    })

    .then(() => {

      alert("OTP sent successfully.");

      setShowOTP(true);

      setLoading(false);

    })

    .catch((error) => {

      console.log(error);

      alert(error.response?.data?.message || "Failed to send OTP");

      setLoading(false);

    });

  }

  function resetPassword() {

    if (!otp.trim()) {
      alert("Enter OTP");
      return;
    }

    if (!newPassword.trim()) {
      alert("Enter New Password");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setResetting(true);

    axios.post("http://localhost:3000/verifyOTP", {
      email,
      otp
    })

    .then(() => {

      axios.post("http://localhost:3000/resetPassword", {

        email,
        newPassword

      })

      .then(() => {

        alert("Password Reset Successfully");

        navigate("/login");

      })

      .catch((error) => {

        alert(error.response?.data?.message || "Reset Failed");

        setResetting(false);

      });

    })

    .catch((error) => {

      alert(error.response?.data?.message || "Invalid OTP");

      setResetting(false);

    });

  }

  return (
    <>
      <h1>Forgot Password</h1>

      <div className="login-form">

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={showOTP}
        />

        {
          !showOTP && (
            <button
              onClick={sendOTP}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )
        }

        {
          showOTP && (
            <>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                onClick={resetPassword}
                disabled={resetting}
              >
                {resetting ? "Resetting..." : "Reset Password"}
              </button>

            </>
          )
        }

      </div>
    </>
  );

}

export default ForgotPassword;