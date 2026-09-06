import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Signup({ onSignupSuccess, onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/users/signup", form);
      onSignupSuccess(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="panel">
      <h3>Create an account</h3>
      {error && <p className="msg-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Full name</label>
          <input
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="field">
          <label>I am a</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>
        <button className="btn-primary" type="submit">Sign up</button>
      </form>
      <p className="switch-link">
        Already have an account?{" "}
        <button className="link-button" onClick={onSwitchToLogin}>
          Log in
        </button>
      </p>
    </div>
  );
}

export default Signup;