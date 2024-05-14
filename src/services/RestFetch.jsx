import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  registrazioneUtenteURL,
  loginURL,
  saveMeteoDataURL,
} from "./RestConfig";

export async function login(credenziali) {
  const jsonBody = JSON.stringify(credenziali);

  try {
    const res = await fetch(loginURL, {
      mode: "cors",
      method: "POST",
      body: jsonBody,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast.success("Login avvenuta con successo!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const tokenResponse = await res.json();
      const token = tokenResponse.token;
      Cookies.set("token", token);

      return token;
    } else {
      toast.error("Si è verificato un errore durante la login.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    console.error("Errore durante la login:", error);
    toast.error("Si è verificato un errore durante la login.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    throw error;
  }
}

export async function registrazione(utente) {
  const jsonBody = JSON.stringify(utente);

  try {
    const res = await fetch(registrazioneUtenteURL, {
      mode: "cors",
      method: "POST",
      body: jsonBody,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast.success(
        "Registrazione avvenuta con successo! Adesso effettua la login per vedere le previsioni meteo",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      toast.error("Si è verificato un errore durante la registrazione.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    return res;
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    toast.error("Si è verificato un errore durante la registrazione.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    throw error;
  }
}

export async function meteo(url) {
  try {
    const res = await fetch(url, {
      mode: "cors",
      method: "GET",
    });

    return await res.json();
  } catch (error) {
    console.error("Errore durante la login:", error);
  }
}

export async function registrazioneMeteo(datiMeteo, token) {
  const jsonBody = JSON.stringify(datiMeteo);

  try {
    const res = await fetch(saveMeteoDataURL, {
      mode: "cors",
      method: "POST",
      body: jsonBody,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Errore durante il salvataggio dei dati del meteo:", error);
  }
}
