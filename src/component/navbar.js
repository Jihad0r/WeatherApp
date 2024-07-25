import { useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Search } from "./search";

export function Navbar({ submit, search }) {
  const [show, setShow] = useState(false);
  return (
    <div className="nav">
      <div>
      <TiWeatherPartlySunny className="weather_icon" />
      <Search submit={submit} search={search} />
      </div>
      <FaBars className="bar" onClick={()=>setShow(!show)}/>
      <ul className={show?"appear":""}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Weather
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/news"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
