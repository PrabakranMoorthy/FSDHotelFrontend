import React from "react";
import useFetch from "../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels/?featured=true");
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[1024px] flex justify-between gap-[20px]">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="flex-1 gap-[10px] flex flex-col" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="w-full h-[250px] object-cover"
              />
              <span className="text-[#333] font-bold">{item.name}</span>
              <span className="font-light">{item.city}</span>
              <span className="font-medium">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div>
                  <button className="bg-[#003580] text-white border-none p-[3px] mr-[10px] font-bold">
                    {item.rating}
                  </button>
                  <span className="text-[14px]">Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
