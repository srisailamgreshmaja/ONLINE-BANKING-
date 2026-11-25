import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { bankReducer, initialState } from "./bankReducer.js";

const BankContext = createContext(null);

export function BankProvider({ children }) {
  const [state, dispatch] = useReducer(bankReducer, initialState);
  const [notice, setNotice] = useState("");

  // Fetch account details when the page loads
  useEffect(() => {
    let users = null;
    try {
      users = JSON.parse(localStorage.getItem("ib-users"));
    } catch {
      users = null;
    }
    dispatch({ type: "LOAD", users });
  }, []);

  // Persist after the initial load has finished
  useEffect(() => {
    if (state.loaded) {
      localStorage.setItem("ib-users", JSON.stringify(state.users));
    }
  }, [state.users, state.loaded]);

  function notify(message) {
    setNotice(message);
    setTimeout(() => setNotice(""), 3000);
  }

  const currentUser =
    state.users.find(u => u.username === state.currentUsername) || null;

  const totalBalance = state.users.reduce(
    (sum, u) => sum + Number(u.balance || 0), 0
  );

  function login({ email, username, password }) {
    const user = state.users.find(u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.username === username &&
      u.password === password
    );
    if (!user) {
      notify("Invalid login details!");
      return false;
    }
    dispatch({ type: "LOGIN", username: user.username });
    return true;
  }

  function signup(form) {
    if (state.users.some(u =>
      u.email.toLowerCase() === form.email.toLowerCase() ||
      u.username === form.username
    )) {
      notify("Email or username already exists!");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      notify("Enter a valid 10-digit phone number.");
      return false;
    }
    dispatch({
      type: "SIGNUP",
      user: {
        ...form,
        balance: Math.max(0, Number(form.deposit) || 0),
        transactions: []
      }
    });
    notify("Account created successfully!");
    return true;
  }

  function adminLogin({ email, username, password }) {
    if (
      email === "admin@indianbank.com" &&
      username === "admin" &&
      password === "admin123"
    ) {
      dispatch({ type: "ADMIN_LOGIN" });
      return true;
    }
    notify("Invalid admin credentials!");
    return false;
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  // Returns { ok, field } so the UI can focus the offending input
  function transact(type, { amount, recipient }) {
    const value = Number(amount);

    if (!value || value <= 0) {
      notify("Enter a valid amount!");
      return { ok: false, field: "amount" };
    }
    if ((type === "WITHDRAW" || type === "TRANSFER") && value > currentUser.balance) {
      notify("Insufficient balance!");
      return { ok: false, field: "amount" };
    }
    if (type === "TRANSFER" && !recipient.trim()) {
      notify("Enter receiver name!");
      return { ok: false, field: "recipient" };
    }

    dispatch({ type, amount: value, recipient });
    notify("Transaction successful!");
    return { ok: true };
  }

  function clearHistory() {
    dispatch({ type: "CLEAR_HISTORY" });
    notify("Transaction history cleared!");
  }

  const value = {
    users: state.users,
    currentUser,
    isAdmin: state.isAdmin,
    totalBalance,
    notice,
    login, signup, adminLogin, logout, transact, clearHistory
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
}

export function useBank() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error("useBank must be used inside <BankProvider>");
  return ctx;
}
