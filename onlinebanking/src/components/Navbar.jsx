import "./Navbar.css";

export default function Navbar({ loggedIn, onLogin, onSignup, onAdmin, onLogout }) {
  return (
    <header className="navbar">
      <a className="logo" href="#home">
        <i className="fa-solid fa-building-columns"></i>
        Indian Bank
      </a>

      {!loggedIn && (
        <>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#security">Security</a>
            <a href="#about">About</a>
          </nav>

          <div className="nav-buttons">
            <button onClick={onLogin}>Login</button>
            <button onClick={onSignup}>Open Account</button>
            <button onClick={onAdmin}>Admin</button>
          </div>
        </>
      )}

      {loggedIn && <button onClick={onLogout}>Back to Home</button>}
    </header>
  );
}
