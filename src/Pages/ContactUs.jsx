// src/ContactUs.js
import React from "react";

const ContactUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Contact Us
        </h2>
        <form>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-black"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-3 border border-black rounded-md focus:outline-none focus:ring focus:ring-black"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-black"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-3 border border-black rounded-md focus:outline-none focus:ring focus:ring-black"
              required
            />
          </div>
          <div className="mb-6 text-black">
            <label
              className="block text-sm font-medium text-black"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full p-3 border border-black rounded-md focus:outline-none  focus:ring focus:ring-black"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-3 rounded-md hover:bg-black transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
