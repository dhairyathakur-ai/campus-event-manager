import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Login({ onLogin, onSwitchToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/users/login", form);
      onLogin(res.data);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="panel">
      <h3>Log in</h3>
      {error && <p className="msg-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input
            name="email"
            placeholder="you@college.edu"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn-primary" type="submit">Log in</button>
      </form>
      <p className="switch-link">
        New here?{" "}
        <button className="link-button" onClick={onSwitchToSignup}>
          Create an account
        </button>
      </p>
    </div>
  );
}

export default Login;