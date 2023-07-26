"use client";

import { getCookie, setCookie } from "cookies-next";
import Joi, { Schema } from "joi";

interface Prop {
  setError: (value: string) => void;
  setToken: (value: string) => void;
  setLoading: (value: boolean) => void;
  setShow: (value: boolean) => void;
  form: FormData;
}

export default async function HandleSignIn({
  form,
  setError,
  setToken,
  setShow,
  setLoading,
}: Prop) {
  let email: FormDataEntryValue = form.get("email")!;
  let password: FormDataEntryValue = form.get("password")!;

  let data = { email, password };

  const schema: Schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .min(8)
      .max(120)
      .label("Email"),
    password: Joi.string().required().min(8).max(120).label("Password"),
  });
  const { error } = schema.validate(data);
  if (error) {
    setError(error.message.toLowerCase());
    setLoading(false);
    return;
  }

  let res = await fetch(`http://localhost:3000/api/auth/signin`, {
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
    window.location.reload();
  } else {
    let message = (await res.text()).toLowerCase();
    setError(message);
    setLoading(false);
  }
}
