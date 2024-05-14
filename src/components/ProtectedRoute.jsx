import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { userContext, setUserContext } = useContext(AuthContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!userContext.isLogged) {
      navigateTo("/");
    }
  }, []);

  return <>{children}</>;
}
