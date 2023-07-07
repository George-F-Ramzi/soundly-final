import React from "react";

interface Prop {
  toggle: (value: boolean) => void;
}

export default function SignIn({ toggle }: Prop) {
  return (
    <form className="w-ful h-[96%]">
      <h2 className="text-white mb-[51px] text-2xl leading-[150%] mt-5 font-bold">
        Welcome Back!
        <br />
        Login To Your Account.
      </h2>

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
        min={8}
      />
      <button
        type="submit"
        className="w-full h-12 text-center rounded my-[51px] text-base bg-button text-black font-bold"
      >
        Login
      </button>
      <div className="flex h-[15%] flex-col">
        <p className="text-white grow ">
          You don`t have account?{" "}
          <span
            onClick={() => toggle(true)}
            className="text-red-400 cursor-pointer"
          >
            Join
          </span>
        </p>
        <div className="w-full cursor-pointer flex items-center justify-center border border-default bg-transparent h-12 rounded text-base  text-white font-bold">
          Login As A Demo
        </div>
      </div>
    </form>
  );
}