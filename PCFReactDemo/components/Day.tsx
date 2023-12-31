import React from "react";
// import style from "./Day.module.css";
import { DayProps, weatherConfig, WeatherType } from "../data/types";
import {
  PartlyCloudyDayIcon,
  RainIcon,
  SnowIcon,
  SunnyIcon,
  ThunderstormsIcon,
  FogIcon,
  ErrorIcon,
  CloudyIcon,
} from "@fluentui/react-icons-mdl2";

const Day: React.FC<DayProps> = ({ data }) => {
  //první proměná h2 abych dostal z data den v týdnu
  function getDayOfWeek(dateString: string, locale = "en-US"): string {
    // Convert "28.10.2023" to "2023-10-28" to ensure correct parsing
    const [day, month, year] = dateString.split(".");
    const date = new Date(`${year}-${month}-${day}`);

    // Use toLocaleDateString to get the day of the week in the desired locale
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  //druhá proměná abych měl hezké české datum
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
  //prohledávání weatherConfig
  function mapToWeatherType(id: number): WeatherType | null {
    for (const config of weatherConfig) {
      if (config.range) {
        const [start, end] = config.range;
        if (id >= start && id <= end) return config.type;
      } else if (config.codes && config.codes.includes(id)) {
        return config.type;
      }
    }
    return null;
  }

  //Switch na ikony počasí
  function renderWeatherIcon(id: number) {
    const prefix = mapToWeatherType(data.weather[0].id); // Get the first digit
    switch (prefix) {
      case WeatherType.THUNDER:
        return <ThunderstormsIcon />;
      case WeatherType.DRIZZLE:
        return <FogIcon />;
      case WeatherType.RAIN:
        return <RainIcon />;
      case WeatherType.SNOW:
        return <SnowIcon />;
      case WeatherType.FOG:
        return <FogIcon />;
      case WeatherType.SUNNY:
        return <SunnyIcon />;
      case WeatherType.CLOUDY:
        return <PartlyCloudyDayIcon />;
      case WeatherType.CLOUDS:
        return <CloudyIcon />;
      default:
        return <ErrorIcon />; // default case if no match
    }
  }

  return (
    // <div className={style.dayBorder}>
    <div
      style={{
        border: "1px solid black",
        paddingLeft: 0,
        paddingRight: 0,
        width: "160px",
      }}
    >
      <>
        <h2>{getDayOfWeek(formatDate(data.dt_txt), "cs-CZ")}</h2>
        <p>{formatDate(data.dt_txt)}</p>
        <div style={{ fontSize: 50 }}>
          {renderWeatherIcon(data.weather[0].id)}
        </div>
        <p> {`${data.main.temp.toFixed(0)} °C`}</p>
        <p>{data.weather[0].description}</p>
      </>
    </div>
  );
};

export default Day;
