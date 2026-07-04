import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  axios
    .post("http://localhost:3000/login", {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      window.location.reload();
    })
    .catch(() => {
      alert("Invalid Credentials");
    });
}
  return (
    <>
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      <div className="login-links">
        <p>
          <Link className="register-link" to="/forgotpassword">
            Forgot Password?
          </Link>
        </p>

        <p>
          Don't have an account?{" "}
          <Link className="register-link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;