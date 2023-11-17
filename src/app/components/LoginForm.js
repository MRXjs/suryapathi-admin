"use client";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";
import { login } from "../api/auth";
import { useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen";

const LoginForm = () => {
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const eyeBollHandler = () => {
    setPasswordShow(!passwordShow);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login(e, router);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? <LoadingScreen text={"wait "} /> : null}

      <div className="m-auto w-[500px] max-w-[90%]">
        <form
          onSubmit={submitHandler}
          className="w-full h-full p-[20px] bg-[#fff] rounded-[4px] shadow-xl"
        >
          <h1 className="text-center mb-[24px] text-[#222] font-sinha text-6xl">
            we;=,a jkak
          </h1>
          <div>
            <label>පරිශීලක නාමය</label>
            <input
              name="username"
              type="text"
              required
              className="w-full h-[40px] bg-white rounded-[4px] border-solid border-[1px] border-[#C0C0C0] mt-[10px] mb-[18px] px-[10px]"
            />
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <label>මුරපදය</label>
              <input
                name="password"
                type={passwordShow ? "text" : "password"}
                required
                className="w-full h-[40px] bg-white rounded-[4px] border-solid border-[1px] border-[#C0C0C0] mt-[10px] mb-[18px] px-[10px]"
              />
            </div>
            <div
              className="absolute z-10  mt-3 cursor-pointer sm:ml-[26rem] ml-[18rem]"
              onClick={eyeBollHandler}
            >
              <IconContext.Provider value={{ size: "25px" }}>
                <div>
                  {passwordShow ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <input
            type="submit"
            value={"Login"}
            className="ml-[50%] transform translate-x-[-50%] w-[120px] h-[34px] border-none outline-none bg-[#27a327] cursor-pointer text-[16px] uppercase text-white rounded-[4px] transition duration-300 hover:opacity-[0.7]"
          />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
