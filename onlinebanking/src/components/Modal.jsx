import "./Modal.css";

import { useEffect, useRef } from "react";

export default function Modal({ title, onClose, children }) {
  const cardRef = useRef(null);

  // Focus the first input field whenever the modal (or its form) changes
  useEffect(() => {
    cardRef.current?.querySelector("input")?.focus();
  }, [title]);

  return (
    <div className="modal-backdrop">
      <div className="modal-card" ref={cardRef}>
        <button className="close" onClick={onClose}>×</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
