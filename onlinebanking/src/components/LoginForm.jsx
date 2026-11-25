export default function LoginForm({ values, setValues, onSubmit, onSwitchToSignup }) {
  const set = key => e => setValues(p => ({ ...p, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit}>
      <input type="email" placeholder="Email ID" required value={values.email} onChange={set("email")} />
      <input placeholder="Username" required value={values.username} onChange={set("username")} />
      <input type="password" placeholder="Password" required value={values.password} onChange={set("password")} />
      <button type="submit">Login</button>
      <p className="demo-hint">Demo: demo@indianbank.com / demo / 1234</p>
      <p>New user? <button type="button" onClick={onSwitchToSignup}>Create Account</button></p>
    </form>
  );
}
