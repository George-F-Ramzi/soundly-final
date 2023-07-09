"use client";

import TokenContext from "@/utils/tokenContext";
import { ITokenContext } from "@/utils/types";
import { getCookie, setCookie } from "cookies-next";
import React, { useContext, useState } from "react";

let token =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAsImp0aSI6IkhwdHJSdlJOMS1ZSnBPU1EwZl9tVCIsImlhdCI6MTY4ODkxMzYzMywiZXhwIjoxNjg5Nzc3NjMzfQ.x1axfgkuJn53wKb89S6TbzwWUgmTSyz6Yg36Z3ubTEg";

interface Prop {
  toggle: (value: boolean) => void;
}

export default function SignUp({ toggle }: Prop) {
  const { setShow, setToken }: ITokenContext = useContext(TokenContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (form: FormData) => {
    let username: FormDataEntryValue = form.get("username")!;
    let email: FormDataEntryValue = form.get("email")!;
    let password: FormDataEntryValue = form.get("password")!;

    let data = { username, email, password };
    let res = await fetch(`http://localhost:3000/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let token = res.headers.get("x-auth-token");
    if (token != null) {
      const date = new Date();
      date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
      date.toUTCString();
      setCookie("token", token, { expires: date });
      let savedToken = getCookie("token");
      setToken && setToken(savedToken as string);
      setShow && setShow(false);
    } else {
      let message = (await res.text()).toLowerCase();
      setError(message);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        let form: FormData = new FormData(e.currentTarget);
        handleSubmit(form);
      }}
      className="w-ful h-[96%]"
    >
      <h2 className="text-white mb-[51px] text-2xl leading-[150%] mt-5 font-bold">
        Hi There!
        <br />
        Create A New Account
      </h2>
      <label
        className="text-[#D1D5DB] block  text-sm font-bold"
        htmlFor="UInput"
      >
        Username
      </label>
      <input
        className="border text-sm w-full font-medium mt-[13px] rounded-[4px] text-para bg-transparent valid:text-white border-default py-[15.5px] px-4"
        name="username"
        type="text"
        id="UInput"
        placeholder="Enter your username here"
        minLength={8}
        maxLength={16}
        required
      />
      {error && error.includes("username") ? (
        <p className="text-red-300 my-3">{error}</p>
      ) : (
        ""
      )}
      <label
        className="text-[#D1D5DB] block mt-[13px]  text-sm font-bold"
        htmlFor="EInput"
      >
        Email
      </label>
      <input
        className="border focus:text-white text-sm w-full font-medium mt-[13px] rounded-[4px] text-para bg-transparent valid:text-white border-default py-[15.5px] px-4"
        name="email"
        type="email"
        id="EInput"
        placeholder="Enter your email here"
        required
      />
      {error && error.includes("email") ? (
        <p className="text-red-300 my-3">{error}</p>
      ) : (
        ""
      )}
      <label
        className="text-[#D1D5DB] block mt-[13px]  text-sm font-bold"
        htmlFor="PInput"
      >
        Password
      </label>
      <input
        className="border text-sm w-full font-medium mt-[13px] rounded-[4px] text-para bg-transparent valid:text-white border-default py-[15.5px] px-4"
        name="password"
        type="password"
        id="EInput"
        placeholder="Enter your password here"
        required
        minLength={8}
      />
      {error && error.includes("password") ? (
        <p className="text-red-300 my-3">{error}</p>
      ) : (
        ""
      )}
      {loading ? (
        <div className="w-full border-none outline-none h-12 flex items-center justify-center border Z rounded my-[51px] text-base bg-green-500 text-black font-bold">
          Loading
        </div>
      ) : (
        <button
          type="submit"
          className="w-full h-12 text-center rounded my-[51px] text-base bg-button text-black font-bold"
        >
          Join
        </button>
      )}
      <div className="flex h-[15%] flex-col">
        <p className="text-white grow ">
          Already have account?{" "}
          <span
            onClick={() => toggle(false)}
            className="text-red-400 cursor-pointer"
          >
            Login
          </span>
        </p>
        <div
          onClick={() => {
            const date = new Date();
            date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
            date.toUTCString();
            setCookie("token", token, { expires: date });
            let savedToken = getCookie("token");
            setToken && setToken(savedToken as string);
            setShow && setShow(false);
          }}
          className="w-full cursor-pointer flex items-center justify-center border border-default bg-transparent h-12 rounded text-base  text-white font-bold"
        >
          Login As A Demo
        </div>
      </div>
    </form>
  );
}
