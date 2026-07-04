import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
 function handleRegister(e: React.FormEvent) {

  e.preventDefault();

  if (
    !name.trim() ||
    !email.trim() ||
    !password.trim() ||
    !department.trim() ||
    !phone.trim()
  ) {
    alert("Please fill in all fields.");
    return;
  }
    setLoading(true);
    axios.post("http://localhost:3000/sendOTP", {
      email
    })

    .then(() => {

      alert("OTP sent to your email.");

      setShowOTP(true);
      setLoading(false);

    })

    .catch((error) => {

      console.log(error);

      alert("Failed to send OTP");

      setLoading(false);

    });

}
function verifyOTP() {
  setVerifying(true);
  axios.post("http://localhost:3000/verifyOTP", {
    email,
    otp
  })

  .then(() => {
    axios.post("http://localhost:3000/register", {
      name,
      email,
      password,
      department,
      phone,
      role: "student"
    })

    .then((response) => {
      setVerifying(false);
      alert("Registration Successful");

      localStorage.setItem("role", response.data.role);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      navigate("/");

      window.location.reload();

    })

    .catch((error) => {
      setVerifying(false);
      alert(error.response?.data?.message || "Registration Failed");

    });

  })

  .catch((error) => {
    setVerifying(false);
    alert(error.response?.data?.message || "Invalid OTP");

  });

}
  return (
    <>
      <h1>Register</h1>

      <form className="login-form" onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={showOTP}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={showOTP}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={showOTP}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          disabled={showOTP}
         >

          <option value="">Select Department</option>

          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="CE">CE</option>
          <option value="ME">ME</option>
          <option value="AI">AI</option>
          <option value="IT">IT</option>

        </select>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={showOTP}
        />
        {
          showOTP && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
                <button
                  type="button"
                  onClick={verifyOTP}
                  disabled={verifying}
                >
                  {verifying ? "Verifying..." : "Verify OTP"}
                </button>
            </>
          )
        }
        {
          !showOTP && (
            <button
              type="submit"
              disabled={loading || showOTP}
            >
              {loading ? "Sending OTP..." : "Register"}
            </button>
          )
        }

      </form>

      <p className="bottom-text">
        Already have an account?{" "}
        <Link className="register-link" to="/login">
          Login
        </Link>
      </p>
    </>
  );
}

export default Register;