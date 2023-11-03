import React, { useState, useEffect } from "react";
import style from "./ForecastMain.module.css";
import Day from "./Day";
import Map from "./Map";
import {
  WeatherAPIResponse,
  IWeatherData,
  IWeatherDataHeader,
} from "../data/types";
import { TextField } from "@fluentui/react/lib/TextField";
import axios from "axios";

export const WeatherForecast = () => {
  const [data, setData] = useState<IWeatherData[] | null>(null);
  const [dataGeo, setDataGeo] = useState<IWeatherDataHeader | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errInput, setErrInput] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");
  const [cityNameM, setCityNameM] = useState<string>("");
  const city = cityNameM || "Praha"; // You can change this if needed
  const apiKey = "61c7a2fcaa6de933b65c654e8dee7798";

  //fetch for forecast
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=cz&appid=${apiKey}&units=metric`;
        // const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get<WeatherAPIResponse>(endpoint);
        const filteredData = response.data.list.filter((entry) =>
          entry.dt_txt.endsWith("12:00:00")
        );

        setDataGeo(response.data.city);
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setErrInput(true);
        setLoading(false);
      }
    };

    fetchWeatherData();
    setErrInput(false);
  }, [apiKey, city]);

  const handleCityNameChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setCityName(newValue || "");
  };

  const enterHitHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the key pressed is the Enter key
    if (event.key === "Enter") {
      // Prevent the default action to avoid submitting the form if the text field is within a form
      event.preventDefault();
      // Set cityNameM to the current value of cityName
      setCityNameM(cityName);
      // Reset value after enter
      setCityName("");
    }
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          alignItems: "center",
        }}
      >
        <div></div>
        <h1>Weather forecast app</h1>
        <div
          style={{
            maxWidth: "175px",
          }}
        >
          <TextField
            placeholder="Vložte název města..."
            value={cityName}
            onChange={handleCityNameChange}
            onKeyDown={enterHitHandler}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginBottom: 60,
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          data
            ?.slice(0, 5)
            .map((dayData, index) => <Day key={index} data={dayData} />)
        )}
      </div>

      {loading ? (
        <div>Loading map...</div>
      ) : errInput ? (
        <h2>Prosím vložte správný název města!</h2>
      ) : (
        <div>
          <h2>{dataGeo?.name}</h2>
          <Map latitude={dataGeo?.coord.lat} longitude={dataGeo?.coord.lon} />
        </div>
      )}
    </>
  );
};
