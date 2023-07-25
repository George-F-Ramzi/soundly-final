"use client";

import HandleSignIn from "@/utils/handleSignIn";
import HandleSignUp from "@/utils/handleSignUp";
import TokenContext from "@/utils/tokenContext";
import { ITokenContext } from "@/utils/types";
import React, { useContext, useState } from "react";

let user = {
  email: "demo@email.com",
  password: "12345678",
};

interface Prop {
  toggle: (value: boolean) => void;
}

export default function SignUp({ toggle }: Prop) {
  const { setShow, setToken }: ITokenContext = useContext(TokenContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        let form: FormData = new FormData(e.currentTarget);
        if (setShow !== undefined && setToken !== undefined) {
          await HandleSignUp({ form, setError, setLoading, setShow, setToken });
        }
      }}
      className='w-ful h-[96%]'
    >
      <h2 className='text-white mb-[51px] text-2xl leading-[150%] mt-5 font-bold'>
        Hi There!
        <br />
        Create A New Account
      </h2>
      <label
        className='text-[#D1D5DB] block  text-sm font-bold'
        htmlFor='UInput'
      >
        Username
      </label>
      <input
        className='border text-sm w-full font-medium mt-[13px] rounded-[4px] text-para bg-transparent valid:text-white border-default py-[15.5px] px-4'
        name='username'
        type='text'
        id='UInput'
        placeholder='Enter your username here'
        minLength={8}
        maxLength={16}
        required
      />
      {error && error.includes("username") ? (
        <p className='text-red-300 my-3'>{error}</p>
      ) : (
        ""
      )}
      <label
        className='text-[#D1D5DB] block mt-[13px]  text-sm font-bold'
        htmlFor='EInput'
      >
        Email
      </label>
      <input
        className='border focus:text-white text-sm w-full font-medium mt-[13px] rounded-[4px] text-para bg-transparent valid:text-white border-default py-[15.5px] px-4'
        name='email'
        type='email'
        id='EInput'
        placeholder='Enter your email here'
        required
      />
      {error && error.includes("email") ? (
        <p className='text-red-300 my-3'>{error}</p>
      ) : (
        ""
      )}
      <label
        className='text-[#D1D5DB] block mt-[13px]  text-sm font-bold'
        htmlFor='PInput'
      >
        Password
      </label>
      <input
        className='border text-sm w-full font-medium mt-[13px] rounded-[4px] text-para bg-transparent valid:text-white border-default py-[15.5px] px-4'
        name='password'
        type='password'
        id='PInput'
        placeholder='Enter your password here'
        required
        minLength={8}
      />
      {error && error.includes("password") ? (
        <p className='text-red-300 my-3'>{error}</p>
      ) : (
        ""
      )}
      {loading ? (
        <div className='w-full border-none outline-none h-12 flex items-center justify-center border Z rounded my-[51px] text-base bg-green-500 text-black font-bold'>
          Loading
        </div>
      ) : (
        <button
          type='submit'
          className='w-full h-12 text-center rounded my-[51px] text-base bg-button text-black font-bold'
        >
          Join
        </button>
      )}
      <div className='flex h-[15%] flex-col'>
        <p className='text-white grow '>
          Already have account?{" "}
          <span
            onClick={() => toggle(false)}
            className='text-red-400 cursor-pointer'
          >
            Login
          </span>
        </p>
        <div
          onClick={async () => {
            let form = new FormData();
            form.append("email", user.email);
            form.append("password", user.password);
            if (setShow !== undefined && setToken !== undefined) {
              await HandleSignIn({
                form,
                setError,
                setLoading,
                setShow,
                setToken,
              });
            }
          }}
          className='w-full cursor-pointer flex items-center justify-center border border-default bg-transparent h-12 rounded text-base  text-white font-bold'
        >
          Login As A Demo
        </div>
      </div>
    </form>
  );
}
