import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../Components/SearchItem";
import useFetch from "../Hooks/useFetch";
import { SearchContext } from "../Context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const { dispatch } = useContext(SearchContext);

  const handleclick = () => {
    reFetch();
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-[1024px] flex gap-5">
          <div className="flex-1 bg-[#febb02] p-2.5 rounded-lg sticky top-[10px] h-max">
            <h1 className="text-[20px] text-[#555] mb-2.5">Search</h1>
            <div className="flex flex-col gap-1.25 mb-2.5 ">
              <label className="text-[12px]">Destination</label>
              <input
                placeholder={destination}
                type="text"
                className="h-[30px] border-none p-1.25"
              />
            </div>
            <div className="flex flex-col gap-1.25 mb-2.5">
              <label className="text-[12px]">Check-in Date</label>
              <span
                className="h-[30px] p-1.25 bg-white flex items-center cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="flex flex-col gap-1.25 mb-2.5">
              <label className="text-[12px]">Options</label>
              <div className="p-3">
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="h-[30px] p-[5px] bg-white flex items-center cursor-pointer">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="w-[50px] "
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="h-[30px] p-[5px] bg-white flex items-center cursor-pointer">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="w-[50px] "
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="h-[30px] p-[5px] bg-white flex items-center cursor-pointer">
                    Adult
                  </span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px] "
                    placeholder={options.adult}
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="h-[30px] p-[5px] bg-white flex items-center cursor-pointer">
                    Children
                  </span>
                  <input
                    type="number"
                    min={0}
                    className="w-[50px] "
                    placeholder={options.children}
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="h-[30px] p-[5px] bg-white flex items-center cursor-pointer">
                    Room
                  </span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px] "
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button
              className="p-[10px] bg-[#0071c2] text-white border-none w-full font-medium cursor-pointer"
              onClick={handleclick}
            >
              Search
            </button>
          </div>
          <div className="flex-3">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
