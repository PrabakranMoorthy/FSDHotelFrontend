import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import FontAwesomeIcon from "react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { SearchContext } from "../Context/SearchContext";
import { AuthContext } from "../Context/AuthContext";
import Reserve from "../Components/Reserve";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import MailList from "../Components/MailList";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="flex flex-col items-center mt-5">
          {open && (
            <div className="sticky top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.613)] z-[999] flex items-center">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="absolute top-5 right-5 text-2xl text-gray-300 cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="absolute top-[50%] left-5 text-3xl text-gray-300 cursor-pointer"
                onClick={() => handleMove("l")}
              />
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="absolute top-[50%] right-5 text-3xl text-gray-300 cursor-pointer"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="w-full max-w-[1024px] flex flex-col gap-2 relative">
            <button className="absolute top-2 right-0 border-none px-5 py-2.5 bg-[#0071c2] text-white font-bold rounded cursor-pointer">
              Reserve or Book Now!
            </button>
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <div className="text-xs flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="text-[#0071c2] font-medium">
              Excellent location - {data.distance} from center
            </span>
            <span className="text-[#008009] font-medium">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="flex flex-wrap justify-between">
              {data.photos?.map((photo, i) => (
                <div className="w-1/3" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt="icon"
                    className="w-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between gap-5 mt-5">
              <div className="flex-3">
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <p className="text-sm mt-5">{data.desc}</p>
              </div>
              <div className="flex-1 bg-[#ebf3ff] p-5 flex flex-col gap-5">
                <h1 className="text-base text-[#555]">
                  Perfect for a {days}-night stay!
                </h1>
                <span className="font-sm">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2 className="font-light">
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button
                  onClick={handleClick}
                  className="border-none px-5 py-2.5 bg-[#0071c2] text-white font-bold cursor-pointer rounded"
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
