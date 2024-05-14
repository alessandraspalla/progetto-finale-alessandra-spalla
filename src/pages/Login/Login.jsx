import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../services/RestFetch";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const eyeStyle = {
  fontSize: "1.3rem",
  position: "absolute",
  right: "10px",
  top: "12px",
};

export function Login() {
  const { userContext, setUserContext } = useContext(AuthContext);

  const isLogged = userContext.isLogged;

  const navigateTo = useNavigate();

  const [showPwd, setShowPwd] = useState(false);

  const [formData, setFormData] = useState({
    email: "marc.verdi@example.com",
    password: "Password1@",
  });

  useEffect(() => {
    if (isLogged) {
      navigateTo("/meteo");
    }
  }, [isLogged]);

  const togglePasswordVisibility = () => {
    setShowPwd(!showPwd);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await login(formData);

    if (token !== "" && token != undefined) {
      const decodedToken = jwtDecode(token);

      setUserContext({
        id: decodedToken.id,
        nome: decodedToken.nome,
        cognome: decodedToken.cognome,
        email: decodedToken.email,
        isLogged: true,
      });
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container-fluid d-flex vh-100 justify-content-center align-items-center">
      <form
        className="w-50 p-5 rounded border border-dark-subtle"
        onSubmit={handleSubmit}
      >
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3 position-relative">
          <input
            type={showPwd ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
          <span style={eyeStyle} onClick={togglePasswordVisibility}>
            <i className="bi bi-eye"></i>
          </span>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
