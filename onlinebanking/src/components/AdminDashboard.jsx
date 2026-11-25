import "./Dashboard.css";
import { useBank } from "../context/BankContext.jsx";
import { money } from "../utils/money.js";

export default function AdminDashboard() {
  const { users, totalBalance } = useBank();

  return (
    <main className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-stats">
        <div>
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>
        <div>
          <h2>{money(totalBalance)}</h2>
          <p>Total Account Balances</p>
        </div>
      </div>

      <section className="transactions-card">
        <h2>Registered Users</h2>
        {users.map(user => (
          <div className="transaction-row" key={user.username}>
            <b>{user.name}</b>
            <span>{user.email}</span>
            <strong>{money(user.balance)}</strong>
          </div>
        ))}
      </section>
    </main>
  );
}
