import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EventList from "./components/EventList";
import CreateEventForm from "./components/CreateEventForm";
import axiosInstance from "./api/axiosInstance";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("login"); // "login" | "signup"
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogin = (data) => setUser(data);
  const handleLogout = () => setUser(null);

  const handleSignupSuccess = async (email, password) => {
    // Auto-login right after signup so the user doesn't have to type credentials twice
    try {
      const res = await axiosInstance.post("/users/login", { email, password });
      setUser(res.data);
    } catch {
      setAuthView("login"); // fallback: just send them to log in manually
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <span className="app-mark">CE</span>
          <div>
            <h1 className="app-title">Campus Events</h1>
            <p className="app-subtitle">Find what's happening. Show up.</p>
          </div>
          {user && (
            <div className="app-user">
              <span className="role-pill">{user.role}</span>
              <button className="link-button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="app-main">
        {!user ? (
          <div className="auth-wrap">
            {authView === "login" ? (
              <Login
                onLogin={handleLogin}
                onSwitchToSignup={() => setAuthView("signup")}
              />
            ) : (
              <Signup
                onSignupSuccess={handleSignupSuccess}
                onSwitchToLogin={() => setAuthView("login")}
              />
            )}
          </div>
        ) : (
          <div className="dashboard">
            {user.role === "organizer" && (
              <CreateEventForm
                organizerId={user.user_id}
                onEventCreated={() => setRefreshKey((k) => k + 1)}
              />
            )}
            <EventList key={refreshKey} userId={user.user_id} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;