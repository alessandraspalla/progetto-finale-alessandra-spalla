import React, { useState } from "react";
import { registrazione } from "../../services/RestFetch";
import { useNavigate } from "react-router-dom";

export function Registrazione() {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((await registrazione(formData)).ok) {
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        password: "",
      });
      navigateTo("/");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <form
        className="w-50 p-5 rounded border border-dark-subtle"
        onSubmit={handleSubmit}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            placeholder=""
            value={formData.nome}
            onChange={handleChange}
          />
          <label htmlFor="nome">Nome</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="cognome"
            name="cognome"
            placeholder=""
            value={formData.cognome}
            onChange={handleChange}
          />
          <label htmlFor="cognome">Cognome</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder=""
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder=""
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Registrati
        </button>
      </form>
    </div>
  );
}
