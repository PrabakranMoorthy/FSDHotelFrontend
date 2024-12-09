import axios from "axios";
import React, { useContext, useState } from "react";
import FontAwesomeIcon from "react-fontawesome";
import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { SearchContext } from "../Context/SearchContext";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `/api/rooms/availability/${roomId}`,
            {
              dates: allDates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.418)] fixed top-0 left-0 flex items-center justify-center">
      <div className="bg-white p-[20px] relative">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="flex items-center gap-[50px] p-[20px]" key={item._id}>
            <div className="flex flex-col gap-[5px]">
              <div className="font-medium">{item.title}</div>
              <div className="font-sm">{item.desc}</div>
              <div className="font-[12px]">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="font-medium">{item.price}</div>
            </div>
            <div className="flex flex-wrap gap-[5px] text-[8px] text-gray-500">
              {item.roomNumbers.map((roomNumber) => (
                <div className="flex flex-col">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="border-none p-[10px_20px] bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px] w-full mt-[20px]"
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
