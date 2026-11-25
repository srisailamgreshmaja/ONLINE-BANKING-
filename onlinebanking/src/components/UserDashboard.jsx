import "./Dashboard.css";
import { useRef, useState } from "react";
import { useBank } from "../context/BankContext.jsx";
import ActionBox from "./ActionBox.jsx";
import { money } from "../utils/money.js";

export default function UserDashboard() {
  const { currentUser: user, transact, clearHistory, logout } = useBank();
  const [form, setForm] = useState({ recipient: "", amount: "" });

  // Refs to input fields so we can focus the one that failed validation
  const recipientRef = useRef(null);
  const amountRef = useRef(null);

  function run(type) {
    const result = transact(type, form);
    if (result.ok) {
      setForm({ recipient: "", amount: "" });
    } else if (result.field === "recipient") {
      recipientRef.current?.focus();
    } else {
      amountRef.current?.focus();
    }
  }

  const setAmount = v => setForm(p => ({ ...p, amount: v }));

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>{user.email}</p>
        </div>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="balance-card">
        <p>Available Balance</p>
        <h1>{money(user.balance)}</h1>
        <span>INDIAN BANK DIGITAL ACCOUNT</span>
      </div>

      <section className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="bank-actions">
          <ActionBox
            title="Deposit Money"
            amount={form.amount}
            setAmount={setAmount}
            onClick={() => run("DEPOSIT")}
            inputRef={amountRef}
          />

          <ActionBox
            title="Withdraw Money"
            amount={form.amount}
            setAmount={setAmount}
            onClick={() => run("WITHDRAW")}
          />

          <div className="action-panel">
            <h3>Transfer Money</h3>
            <input
              ref={recipientRef}
              placeholder="Receiver name"
              value={form.recipient}
              onChange={e => setForm(p => ({ ...p, recipient: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Amount ₹"
              value={form.amount}
              onChange={e => setAmount(e.target.value)}
            />
            <button onClick={() => run("TRANSFER")}>Transfer</button>
          </div>
        </div>
      </section>

      <section className="transactions-card">
        <div className="transaction-header">
          <h2>Recent Transactions</h2>
          <button onClick={clearHistory}>Clear History</button>
        </div>

        {user.transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          user.transactions.map(item => (
            <div className="transaction-row" key={item.id}>
              <span>{item.title}</span>
              <small>{item.date}</small>
              <strong className={item.amount >= 0 ? "credit" : "debit"}>
                {item.amount >= 0 ? "+" : "-"}
                {money(Math.abs(item.amount))}
              </strong>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
