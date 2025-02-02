// src/Login.js
import React, { useState } from "react";
import CommonButton from "../Common/CommonButton";
import { Link } from "react-router-dom";
import TextInput from "../Common/TextInput";

const Login = () => {
  const fields = { email: "", password: "" };

  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);

  const handleChange = (e) => {
    const { name, value } = e?.target?.value;

    setParams({ ...params, [name]: value });
  };

  const handleLogin = () => {
    window.open("http://localhost:3333/auth/google");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = params;
    axiosInstance
      .post("/users", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("response:", response);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full">
        {/* <p className="text-center text-gray-600 mb-4">
          Kahani Suno, Tum Jubani Suno..
          </p> */}

        <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center ">Sign in </h2>
          <TextInput
            type="email"
            name="email"
            placeholder="Enter Email"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.email}
            onChange={handleChange}
            error={errors?.email}
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Enter Password"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.password}
            onChange={handleChange}
            error={errors?.password}
          />

          <CommonButton size="sm" styles="w-full  text-md">
            Sign In
          </CommonButton>
        </form>

        <button
          onClick={handleLogin}
          className="w-full bg-white  font-semibold py-2 rounded border  hover:bg-blue-50 transition duration-200"
        >
          Sign in with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-500">or</p>

          <Link className="underline text-sm" to="/signup">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
