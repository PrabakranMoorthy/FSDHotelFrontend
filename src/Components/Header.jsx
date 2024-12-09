import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "react-fontawesome";
import { SearchContext } from "../Context/SearchContext";
import { AuthContext } from "../Context/AuthContext";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { faCar, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div className="bg-teal-400 text-white flex justify-center relative">
      <div
        className={
          type === "list"
            ? "mt-[20px]"
            : "w-full max-w-[1024px] my-[20px] mb-[100px]"
        }
      >
        <div className="flex items-center gap-[10px]">
          <div className="border border-white p-[10px] rounded-[20px]">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="border border-white p-[10px] rounded-[20px]">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="border border-white p-[10px] rounded-[20px]">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="border border-white p-[10px] rounded-[20px]">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="border border-white p-[10px] rounded-[20px]">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Worlds leading chain of hotels and homes
            </h1>
            <p className="my-5">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free VENS HAPPY Booking account
            </p>
            {!user && (
              <button className="bg-[#0071c2] text-white font-medium border-none p-2 cursor-pointer">
                Sign in / Register
              </button>
            )}
            <div className="h-[30px] bg-white border-3 border-[#18b2a0] flex items-center justify-around py-2 rounded-md absolute bottom-[-25px] w-full max-w-[1024px]">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBed} className="text-gray-300" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-none outline-none"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-gray-300"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="text-gray-300 cursor-pointer"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="absolute top-[50px] z-2"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPerson} className="text-gray-300" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="absolute top-[50px] z-2 bg-white text-gray-500 rounded-md shadow-[0px_0px_10px_-5px_rgba(0,_0,_0,_0.4)] ">
                    <div className="w-[200px] flex justify-between m-2">
                      <span className="optionText">Adult</span>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <button
                          disabled={options.adult <= 1}
                          className="cursor-not-allowed"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-[200px] flex justify-between m-2">
                      <span className="optionText">Children</span>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <button
                          disabled={options.children <= 0}
                          className="cursor-not-allowed"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-[200px] flex justify-between m-2">
                      <span className="optionText">Room</span>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <button
                          disabled={options.room <= 1}
                          className="cursor-not-allowed"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-[#0071c2] text-white font-medium border-none p-2 cursor-pointer"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
