import React from "react";

const MailList = () => {
  return (
    <div className="w-full mt-[50px] bg-[#00e0c6] text-white flex flex-col items-center gap-[20px] p-[50px]">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and well send the best deals to you
      </span>
      <div>
        <input
          className="w-[300px] h-[30px] p-[10px] border-none mr-[10px] rounded-[5px]"
          type="text"
          placeholder="Your Email"
        />
        <button className="h-[50px] bg-[#0071c2] text-white font-medium border-none rounded-[5px] cursor-pointer">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default MailList;
