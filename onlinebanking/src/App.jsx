import { useState } from "react";
import "./styles/base.css";

import { useBank } from "./context/BankContext.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Footer from "./components/Footer.jsx";
import Modal from "./components/Modal.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import AdminLoginForm from "./components/AdminLoginForm.jsx";
import Toast from "./components/Toast.jsx";

const emptySignup = {
  name: "", email: "", username: "",
  phone: "", password: "", deposit: ""
};
const emptyLogin = { email: "", username: "", password: "" };

export default function App() {
  const { currentUser, isAdmin, notice, login, signup, adminLogin, logout } = useBank();

  // UI-only state
  const [modal, setModal] = useState("");
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [signupForm, setSignupForm] = useState(emptySignup);
  const [adminForm, setAdminForm] = useState(emptyLogin);

  const loggedIn = Boolean(currentUser) || isAdmin;

  function handleLogin(e) {
    e.preventDefault();
    if (login(loginForm)) setModal("");
  }

  function handleSignup(e) {
    e.preventDefault();
    if (signup(signupForm)) {
      setSignupForm(emptySignup);
      setModal("login");
    }
  }

  function handleAdminLogin(e) {
    e.preventDefault();
    if (adminLogin(adminForm)) setModal("");
  }

  return (
    <div className="site-shell">
      <Navbar
        loggedIn={loggedIn}
        onLogin={() => setModal("login")}
        onSignup={() => setModal("signup")}
        onAdmin={() => setModal("admin")}
        onLogout={logout}
      />

      {!loggedIn && (
        <HomePage
          onLogin={() => setModal("login")}
          onSignup={() => setModal("signup")}
        />
      )}

      {currentUser && <UserDashboard />}
      {isAdmin && <AdminDashboard />}

      <Footer />

      {modal && (
        <Modal
          title={
            modal === "signup" ? "Create Account" :
            modal === "admin" ? "Admin Login" : "User Login"
          }
          onClose={() => setModal("")}
        >
          {modal === "login" && (
            <LoginForm
              values={loginForm}
              setValues={setLoginForm}
              onSubmit={handleLogin}
              onSwitchToSignup={() => setModal("signup")}
            />
          )}
          {modal === "signup" && (
            <SignupForm
              values={signupForm}
              setValues={setSignupForm}
              onSubmit={handleSignup}
              onSwitchToLogin={() => setModal("login")}
            />
          )}
          {modal === "admin" && (
            <AdminLoginForm
              values={adminForm}
              setValues={setAdminForm}
              onSubmit={handleAdminLogin}
            />
          )}
        </Modal>
      )}

      <Toast message={notice} />
    </div>
  );
}
