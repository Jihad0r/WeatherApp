import React, { useState } from "react";
import { Forecast } from "./forecast";
import Img1 from "../image/veryhot.jpg";
import Img3 from "../image/verycold.jpg";
import Img2 from "../image/normal.jpg";
import { TiWeatherSnow } from "react-icons/ti";
import { LuSun, LuCloud } from "react-icons/lu";
import { RiWindyFill } from "react-icons/ri";
import { TbDroplet } from "react-icons/tb";
import { CiTempHigh } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa6";
import { Navbar } from "./navbar";

export const Weather = ({ data, submit, search, forecastData, time }) => {
  const [show, setShow] = useState(false);

  if (!data) return null;

  const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")} - ${time.toLocaleString("en-US", {
    weekday: "long",
  })}, ${time.getDate()} ${time.toLocaleString("en-US", {
    month: "short",
  })} '${time.getFullYear().toString().substr(-2)}`;

  function showInfo() {
    setShow(!show);
  }

  let imageSrc;
  let Icon;
  if (data.main.temp < 10) {
    imageSrc = Img3;
    Icon = TiWeatherSnow;
  } else if (data.main.temp >= 10 && data.main.temp <= 20) {
    imageSrc = Img2;
    Icon = LuCloud;
  } else {
    imageSrc = Img1;
    Icon = LuSun;
  }

  return (
    <>
      <Navbar submit={submit} search={search} />
      {!data && <p>Loading weather data...</p>}
      {data && (
        <>
          <img src={imageSrc} alt="weatherimage" className="image" />
          <div className="weather">
            <div className="current-weather">
              <p className="temp">{Math.floor(data.main.temp)}°</p>
              <div>
                <h2>{data.name}</h2>
                <p className="date">{formattedTime}</p>
              </div>
              <Icon className="icon" />
              <div className="background"></div>
            </div>
            <div className={show ? "info show" : "info"}>
              <h4>Currect Weather...</h4>
              <ul>
                <li>
                  <span>Temp max</span>
                  <span>{Math.floor(data.main.temp_max)}°</span>
                  <CiTempHigh className="temp_max icon" />
                </li>
                <li>
                  <span>Temp min</span>
                  <span>{Math.floor(data.main.temp_min)}°</span>
                  <CiTempHigh className="temp_min icon" />
                </li>
                <li>
                  <span>Humidity</span>
                  <span>{Math.floor(data.main.humidity)}%</span>
                  <TbDroplet className="icon" />
                </li>
                <li>
                  <span>Cloudy</span>
                  <span>{Math.floor(data.clouds.all)}%</span>
                  <LuCloud className="icon" />
                </li>
                <li>
                  <span>Windy</span>
                  <span>{Math.floor(data.wind.speed)} Km/h</span>
                  <RiWindyFill className="icon" />
                </li>
                <div className="background"></div>
              </ul>
              <FaAngleRight
                className={show ? "righticon" : "righticon left"}
                onClick={showInfo}
              />
              <h4>Forecast...</h4>
              <Forecast forecastData={forecastData} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
