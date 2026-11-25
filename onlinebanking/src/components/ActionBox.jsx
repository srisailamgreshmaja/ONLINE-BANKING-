export default function ActionBox({ title, amount, setAmount, onClick, inputRef }) {
  return (
    <div className="action-panel">
      <h3>{title}</h3>
      <input
        ref={inputRef}
        type="number"
        min="0.01"
        placeholder="Amount ₹"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={onClick}>{title}</button>
    </div>
  );
}
