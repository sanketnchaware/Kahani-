// src/Signup.js
import React, { useState } from "react";
import CommonButton from "../Common/CommonButton";
import { Link } from "react-router-dom";
import TextInput from "../Common/TextInput";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const fields = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password1: "",
    password2: "",
  };

  const [params, setParams] = useState(fields);
  const [errors, setErrors] = useState(fields);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    console.log("name, value:", name, value);

    setParams({ ...params, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstname, lastname, phone, email, password1, password2 } = params;

    axiosInstance
      .post("/users", {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        password: password1,
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
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
        <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center ">Sign in </h2>
          <TextInput
            type="text"
            name="firstname"
            placeholder="First Name"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.firstname}
            onChange={handleChange}
            error={errors?.firstname}
          />
          <TextInput
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.lastname}
            onChange={handleChange}
            error={errors?.lastname}
          />
          <TextInput
            type="tel"
            name="phone"
            placeholder="Enter Phone"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.phone}
            onChange={handleChange}
            error={errors?.phone}
          />
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
            name="password1"
            placeholder="Enter Password"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.password1}
            onChange={handleChange}
            error={errors?.password1}
          />
          <TextInput
            type="password"
            name="password2"
            placeholder="Re-enter Password"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.password2}
            onChange={handleChange}
            error={errors?.password2}
          />

          <CommonButton type="submit" size="sm" styles="w-full  text-md">
            Submit
          </CommonButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">or</p>

          <Link className="underline text-sm" to="/signup">
            Already Have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
