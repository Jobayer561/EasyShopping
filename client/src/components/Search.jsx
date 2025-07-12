import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const [inputValue, setInputValue] = useState("");
  const debounceTimeout = useRef(null);

  // Set isSearchPage based on current path
  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
    // eslint-disable-next-line
  }, [location.pathname]);

  // Debounced live search
  useEffect(() => {
    if (isSearchPage) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        if (inputValue.trim() === "") {
          navigate("/search");
        } else {
          navigate(`/search?q=${inputValue}`);
        }
      }, 400);
    }
    return () => clearTimeout(debounceTimeout.current);
    // eslint-disable-next-line
  }, [inputValue, isSearchPage]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      navigate("/search");
    } else {
      navigate(`/search?q=${inputValue}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-[color:#ffbf00]">
      {/* Show back arrow on mobile search page */}
      {isMobile && isSearchPage && (
        <button
          onClick={() => navigate("/")}
          className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-[color:#ffbf00] bg-white rounded-full shadow-md"
          aria-label="Back"
          type="button"
        >
          <FaArrowLeft size={20} />
        </button>
      )}

      <button
        className="flex justify-center items-center h-full p-3"
        onClick={handleSearch}
        aria-label="Search"
        type="button"
      >
        <IoSearch size={22} color="#ffbf00" />
      </button>
      <div className="w-full h-full flex items-center">
        {isSearchPage ? (
          <input
            type="text"
            placeholder="Search for atta dal and more."
            autoFocus
            value={inputValue}
            className="bg-transparent w-full h-full outline-none px-2"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div
            onClick={() => navigate("/search")}
            className="w-full h-full flex items-center cursor-pointer"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "Atta"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
