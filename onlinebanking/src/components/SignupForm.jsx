export default function SignupForm({ values, setValues, onSubmit, onSwitchToLogin }) {
  const set = key => e => setValues(p => ({ ...p, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="Full Name" required value={values.name} onChange={set("name")} />
      <input type="email" placeholder="Email ID" required value={values.email} onChange={set("email")} />
      <input placeholder="Username" required value={values.username} onChange={set("username")} />
      <input type="tel" placeholder="10-digit Phone Number" required pattern="[0-9]{10}" value={values.phone} onChange={set("phone")} />
      <input type="password" placeholder="Password" required value={values.password} onChange={set("password")} />
      <input type="number" min="0" placeholder="Initial Deposit" value={values.deposit} onChange={set("deposit")} />
      <button type="submit">Create Account</button>
      <p>Already registered? <button type="button" onClick={onSwitchToLogin}>Login</button></p>
    </form>
  );
}
