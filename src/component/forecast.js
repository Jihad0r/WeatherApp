import React from "react";
import { LuCloud } from "react-icons/lu";
import { RiWindyFill } from "react-icons/ri";
import { TbDroplet } from "react-icons/tb";
import { CiTempHigh, CiCalendar } from "react-icons/ci";

export const Forecast = ({ forecastData }) => {
  return (
    <ul className="forecast">
      <li className="icons">
        <span><CiCalendar /></span>
        <span><CiTempHigh /></span>
        <span><TbDroplet /></span>
        <span><LuCloud /></span>
        <span><RiWindyFill /></span>
      </li>
      {forecastData.map((forecast, index) => {
        const data = new Date(forecast.dt * 1000);
        const getTheDay = data.toLocaleDateString("en-US", {
          weekday: "short",
        });

        return (
          <li key={index} className="a_day">
            <span>{getTheDay}</span>
            <span>{Math.floor(forecast.main.temp)}°</span>
            <span>{Math.floor(forecast.main.humidity)}%</span>
            <span>{Math.floor(forecast.clouds.all)}%</span>
            <span>{Math.floor(forecast.wind.speed)} Km/h</span>
          </li> 
        );
      })}
    </ul>
  );
};
