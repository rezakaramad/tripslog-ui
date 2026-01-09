import { useNavigate } from "react-router-dom";

export default function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop modal-backdrop-enter" onClick={onClose}>
      <div
        className="modal-content modal-content-enter"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}