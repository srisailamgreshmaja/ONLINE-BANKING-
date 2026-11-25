export default function AdminLoginForm({ values, setValues, onSubmit }) {
  const set = key => e => setValues(p => ({ ...p, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit}>
      <input type="email" placeholder="Admin Email" required value={values.email} onChange={set("email")} />
      <input placeholder="Admin Username" required value={values.username} onChange={set("username")} />
      <input type="password" placeholder="Admin Password" required value={values.password} onChange={set("password")} />
      <button type="submit">Admin Login</button>
      <p className="demo-hint">Demo: admin@indianbank.com / admin / admin123</p>
    </form>
  );
}
