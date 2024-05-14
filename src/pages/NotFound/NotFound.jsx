import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";

export function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center marginFromHeader marginFromFooter"
      style={{ height: "calc(100vh - 112px)" }}
    >
      <h1 className="mb-4">Oops! 404 Pagina non trovata</h1>
      <p className="text-center mb-4">Sembra che tu abbia perso la strada...</p>
      <i className="bi bi-exclamation-triangle text-danger fw-bold fs-1 mb-4"></i>
      <NavLink to="/" className="btn btn-primary">
        Torna indietro
      </NavLink>
    </div>
  );
}
