"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

function LoginPage() {
  const [error, setError] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }

    console.log(res);
  });

  return (
    <div className=" h-[calc(100vh-7rem)] flex justify-center items-center ">
      <form onSubmit={onSubmit}>
        {error && (
          <p className=" p-3 text-sm rounded-lg text-white bg-red-500 ">
            {" "}
            {error}{" "}
          </p>
        )}

        <h1 className=" text-slate-200 font-bold text-4xl mb-4 ">Login</h1>

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

        <button className=" w-full bg-blue-500 text-white p-3 rounded-lg ">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
