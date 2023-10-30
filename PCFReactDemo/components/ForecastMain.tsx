// link na icony: https://developer.microsoft.com/en-us/fluentui#/controls/web/icon

import React, { useState, useEffect } from "react";
import style from "./ForecastMain.module.css";
import Day from "./Day";
import Map from "./Map";
import {
  WeatherAPIResponse,
  IWeatherData,
  IWeatherDataHeader,
} from "../data/types";
import axios from "axios";

export const WeatherForecast = () => {
  const [data, setData] = useState<IWeatherData[] | null>(null);
  const [dataGeo, setDataGeo] = useState<IWeatherDataHeader | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const city = "rome"; // You can change this if needed
  const apiKey = "61c7a2fcaa6de933b65c654e8dee7798";

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=cz&appid=${apiKey}&units=metric`;
        // const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get<WeatherAPIResponse>(endpoint);

        const filteredData = response.data.list.filter((entry) =>
          entry.dt_txt.endsWith("09:00:00")
        );

        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=prague&appid=61c7a2fcaa6de933b65c654e8dee7798`;
        // const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(endpoint);

        setDataGeo(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  // if (data) {
  //   console.log(data);
  // }

  if (dataGeo) {
    console.log(dataGeo);
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "60px",
  };

  const boldTextStyle = {
    fontWeight: "bold",
  };

  return (
    <>
      <h1 style={boldTextStyle}>Weather forecast app</h1>
      <div style={containerStyle}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data
            ?.slice(0, 5)
            .map((dayData, index) => <Day key={index} data={dayData} />)
        )}
      </div>
      <h3>název města</h3>
      <Map latitude={50.2000731} longitude={15.8412544} />
    </>
  );
};
