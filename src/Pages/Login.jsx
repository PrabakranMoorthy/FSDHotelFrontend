import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-[10px]">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="h-[30px] p-[10px]"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="h-[30px] p-[10px]"
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className="border-none p-[10px_20px] bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px]"
        >
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
