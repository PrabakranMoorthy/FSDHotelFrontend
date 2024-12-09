import React from "react";
import useFetch from "../Hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlim,madrid,londan"
  );

  return (
    <div className="w-full max-w-[1024px] flex justify-between gap-[20px] z-10">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="relative text-white rounded-[10px] overflow-hidden h-[250px] flex-1">
            <img
              src="https://i0.wp.com/oneday.travel/wp-content/uploads/one-day-chennai-to-mahabalipuram-and-kanchipuram-trip-sightseeing-tour-package-arjunar-penance-mahabalipuram.jpg?resize=750%2C500&ssl=1"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[20px] left-[20px]">
              <h1>Chennai</h1>
              <h2>369 properties</h2>
            </div>
          </div>

          <div className="relative text-white rounded-[10px] overflow-hidden h-[250px] flex-1">
            <img
              src="https://content.r9cdn.net/rimg/dimg/6d/77/0cc45283-city-32821-176ddb032b7.jpg?width=1200&height=630&crop=false"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[20px] left-[20px]">
              <h1>New Delhi</h1>
              <h2>231 properties</h2>
            </div>
          </div>
          <div className="relative text-white rounded-[10px] overflow-hidden h-[250px] flex-1">
            <img
              src="https://www.telegraph.co.uk/content/dam/Travel/Destinations/Asia/India/Mumbai/gateway-of-india-mumbai-xlarge.jpg?imwidth=640"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[20px] left-[20px]">
              <h1>Mumbai</h1>
              <h2>60 properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
