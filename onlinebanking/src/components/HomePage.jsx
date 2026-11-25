import "./HomePage.css";
import ServiceCard from "./ServiceCard.jsx";

export default function HomePage({ onLogin, onSignup }) {
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            <i className="fa-solid fa-shield-halved"></i>
            Secure Digital Banking
          </span>

          <h1>Banking made <span>simple.</span></h1>

          <p>
            Manage your money, transfer funds and track
            your transactions securely from anywhere.
          </p>

          <div className="hero-buttons">
            <button onClick={onLogin}>Login to Banking →</button>
            <button onClick={onSignup}>Open an Account</button>
          </div>

          <div className="trust-items">
            <span>🔒 Secure</span>
            <span>⚡ Fast</span>
            <span>📱 Digital</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
            alt="Digital Banking"
          />

          <div className="floating-card">
            <h3>INDIAN BANK</h3>
            <p>•••• •••• •••• 4582</p>
            <span>Digital Card</span>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div><h2>10K+</h2><p>Digital Users</p></div>
        <div><h2>100%</h2><p>Secure Banking</p></div>
        <div><h2>24/7</h2><p>Online Access</p></div>
        <div><h2>Fast</h2><p>Transactions</p></div>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <span>OUR SERVICES</span>
          <h2>Banking made easy.</h2>
        </div>

        <div className="services-grid">
          <ServiceCard icon="fa-money-bill-transfer" title="Money Transfer" text="Transfer money easily between accounts." />
          <ServiceCard icon="fa-wallet" title="Digital Wallet" text="Check your available balance anytime." />
          <ServiceCard icon="fa-chart-line" title="Track Spending" text="View your deposits and withdrawals." />
          <ServiceCard icon="fa-credit-card" title="Digital Card" text="Access your digital banking card." />
        </div>
      </section>

      <section className="security-section" id="security">
        <div>
          <h2>Your money is protected.</h2>
          <p>Secure Login – Private Data – Account Protection</p>
        </div>
        <div className="security-image">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=85"
            alt="Secure Banking"
          />
        </div>
      </section>

      <section className="about-section" id="about">
        <h2>Banking for your digital life.</h2>
        <p>Simple and convenient digital banking experience.</p>
      </section>
    </main>
  );
}
