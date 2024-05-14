import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { meteo, registrazioneMeteo } from "../../services/RestFetch";
import Cookies from "js-cookie";

export function InfoMeteo() {
  const [meteoData, setMeteoData] = useState(null);
  const { userContext, setUserContext } = useContext(AuthContext);
  const token = Cookies.get("token");

  useEffect(() => {
    async function fetchData() {
      const api = {
        key: "1480202840873fa1b8d58fafac3bafeb",
        url: "https://api.openweathermap.org/data/2.5/weather",
        city: "palermo",
      };
      const res = await meteo(
        `${api.url}?q=${api.city}&units=metric&APPID=${api.key}`
      );
      setMeteoData(res);
      const formattedData = formatMeteoData(res, token);
      await registrazioneMeteo(formattedData);
    }
    fetchData();
  }, []);

  const formatMeteoData = (data) => {
    const formattedData = {
      city: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      clouds: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(data.sys.sunset * 1000).toISOString(),
      idUtente: userContext.id,
    };
    return formattedData;
  };

  return (
    <div
      className="marginFromHeader marginFromFooter d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f0f8ff", height: "calc(100vh - 112px)" }}
    >
      {meteoData && (
        <div className="card w-75 m-auto rounded shadow">
          <div className="card-header bg-primary text-white">
            Ciao {userContext.nome}, ecco il Meteo
          </div>
          <div className="card-body">
            <h5 className="card-title fw-bold">
              <i className="bi bi-geo-fill"></i> {meteoData.name}
            </h5>
            <hr />
            <p className="card-text">
              <i className="bi bi-thermometer-half"></i>{" "}
              <span className="fw-semibold">Temperatura:</span>{" "}
              {meteoData.main.temp}°C
            </p>
            <p className="card-text">
              <i className="bi bi-thermometer-high"></i>{" "}
              <span className="fw-semibold">Temperatura Percepita:</span>{" "}
              {meteoData.main.feels_like}°C
            </p>
            <p className="card-text">
              <i className="bi bi-journals"></i>{" "}
              <span className="fw-semibold">Descrizione:</span>{" "}
              {meteoData.weather[0].description}
            </p>
            <p className="card-text">
              <i className="bi bi-wind"></i>{" "}
              <span className="fw-semibold">Velocità Vento:</span>{" "}
              {meteoData.wind.speed} m/s
            </p>
            <p className="card-text">
              <i className="bi bi-droplet"></i>{" "}
              <span className="fw-semibold">Umidità:</span>{" "}
              {meteoData.main.humidity}%
            </p>
            <p className="card-text">
              <i className="bi bi-sunrise"></i>{" "}
              <span className="fw-semibold">Alba:</span>{" "}
              {new Date(meteoData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="card-text">
              <i className="bi bi-sunset"></i>{" "}
              <span className="fw-semibold">Tramonto:</span>{" "}
              {new Date(meteoData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
