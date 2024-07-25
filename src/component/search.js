import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export const Search = ({ submit, search }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(searchInput);
    setSearchInput("")
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter your Location"
        name="city"
        value={searchInput}
        onChange={handleChange}
      />
      <button type="submit">
        <IoSearch />
      </button>
    </form>
  );
};
