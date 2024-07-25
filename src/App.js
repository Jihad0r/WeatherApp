import { useState, useEffect } from "react";
import { Weather } from "./component/weather";
import { News } from "./component/news";
import { Contact } from "./component/contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [time, setTime] = useState(new Date());
  const [timezoneOffset, setTimezoneOffset] = useState(0);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState({ city: "Cairo" });
  const [forecastData, setForecastData] = useState([]);

  const fetchWeatherData = async (city) => {
    const apiKey = "58e26527855c18e1f81f638736ebae84";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      setTimezoneOffset(result.timezone);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  const fetchForecastData = async (city) => {
    const apiKey = "3b19bb7080d88a87e5e07506e88a2ebf";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filteredData = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      const result = filteredData.slice(0, 6);
      console.log(result);
      setForecastData(result);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  useEffect(() => {
    fetchWeatherData(search.city);
    fetchForecastData(search.city);
  }, [search.city]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utctime = now.getTime() + now.getTimezoneOffset() * 60000;
      const localTime = new Date(utctime + timezoneOffset * 1000);
      setTime(localTime);
    };

    const int = setInterval(update, 1000);
    return () => clearInterval(int);
  }, [timezoneOffset]);

  const handleSubmit = (city) => {
    setSearch({ city });
  };

  return (
    <BrowserRouter>
      <Routes className="App">
        <Route
          path="/"
          element={
            <Weather
              data={data}
              time={time}
              forecastData={forecastData}
              submit={handleSubmit}
              search={search}
            />
          }
        />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
