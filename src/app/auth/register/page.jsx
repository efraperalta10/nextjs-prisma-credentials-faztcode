"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

function RegisterPage() {
  const [error, setError] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Las contraseñas no coinciden!");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setError((await res.json()).message);
    }

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  return (
    <div className=" h-[calc(100vh-7rem)] flex justify-center items-center ">
      <form onSubmit={onSubmit} className=" grid place-items-center w-1/4 ">
        {error && (
          <p className=" p-3 text-sm rounded-lg text-white bg-red-500 ">
            {error}
          </p>
        )}

        <h1 className=" text-slate-200 font-bold text-4xl mb-4 ">Register</h1>

        <label
          htmlFor="username"
          className=" text-slate-500 mb-2 block text-sm "
        >
          Username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Usuario requerido!",
            },
          })}
          className=" p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
        />
        {errors.username && (
          <span className=" text-sm text-red-500 ">
            {errors.username.message}
          </span>
        )}

        <label htmlFor="email" className=" text-slate-500 mb-2 block text-sm ">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email requerido!",
            },
          })}
          className=" p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
        />
        {errors.email && (
          <span className=" text-sm text-red-500 ">{errors.email.message}</span>
        )}

        <label
          htmlFor="password"
          className=" text-slate-500 mb-2 block text-sm "
        >
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Contraseña requerida!",
            },
          })}
          className=" p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
        />
        {errors.password && (
          <span className=" text-sm text-red-500 ">
            {errors.password.message}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className=" text-slate-500 mb-2 block text-sm "
        >
          Confirm Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirmación de contraseña requerida!",
            },
          })}
          className=" p-3 rounded block mb-2 bg-slate-900 text-slate-300 "
        />
        {errors.confirmPassword && (
          <span className=" text-sm text-red-500 ">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className=" w-full bg-blue-500 text-white p-3 rounded-lg ">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
