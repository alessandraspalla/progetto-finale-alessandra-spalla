import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export function AuthContextProvider({ children }) {
  const token = Cookies.get("token");

  const [userContext, setUserContext] = useState({
    id: 0,
    nome: "",
    cognome: "",
    email: "",
    isLogged: false,
  });

  useEffect(() => {
    if (token !== "" && token != undefined) {
      const decodedToken = jwtDecode(token);
      const { id, nome, cognome, email } = decodedToken;
      setUserContext({
        id: id,
        nome: nome,
        cognome: cognome,
        email: email,
        isLogged: true,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </AuthContext.Provider>
  );
}
