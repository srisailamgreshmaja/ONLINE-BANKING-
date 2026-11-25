export default function ServiceCard({ icon, title, text }) {
  return (
    <div className="service-card">
      <i className={`fa-solid ${icon}`}></i>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
