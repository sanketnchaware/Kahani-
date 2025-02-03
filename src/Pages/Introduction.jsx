import React, { useContext, useState } from "react";
import CommonButton from "../Components/Common/CommonButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "../Components/Common/TextInput";
import UserContext from "../userContext/userContext";

const Introduction = () => {
  const { stories } = useSelector((state) => state.stories);
  const { auth } = useContext(UserContext);

  const [email, setEmail] = useState("");

  console.log(stories, "storiesList");
  return (
    <div className="  divide-y-2">
      <section className=" flex items-center px-44 bg-black text-white   min-h-screen">
        <div className="w-full space-y-10">
          <h2 className="text-center w-full">Write your Story here..</h2>
          {!auth?.isAuthenticated ? (
            <Link to="/signup" className="flex justify-center   w-full">
              <CommonButton styles="w-fit invert" size="md">
                Create Account
              </CommonButton>
            </Link>
          ) : (
            <Link to="/stories" className="flex justify-center   w-full">
              <CommonButton styles="w-fit invert" size="md">
                Explore More
              </CommonButton>
            </Link>
          )}
        </div>
      </section>

      <section className="w-10/12 m-auto   flex items-center  min-h-screen">
        <div className="space-y-8">
          <h2 className="">Best Stories For Today</h2>
          <div className=" grid grid-cols-4 gap-6">
            {React.Children.toArray(
              stories?.map(({ title, description }) => {
                return (
                  <div className="   rounded-lg shadow-sameshadow">
                    <div className="h-44  w-full relative">
                      <div className="absolute left-4 top-4 flex gap-1 z-10 bg-white rounded-full body4 shadow-inner px-2 items-center py-1">
                        <div className="w-6 h-6  rounded-full overflow-hidden">
                          <img
                            className="object-cover  w-full h-full"
                            src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                          />{" "}
                        </div>
                        <span>Mr. Sanket</span>
                      </div>
                      <img
                        className="rounded-tl-lg rounded-tr-lg grayscale  w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1735657061774-a9d62d06c954?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                    </div>

                    <div className="p-4 space-y-2">
                      <p className="body1b">{title}</p>
                      <div className="body4 h-10 text-ellipsis overflow-hidden ">
                        <p className="line-clamp-2">{description}</p>
                      </div>

                      <Link className="block underline  body4b" to="/">
                        Read More..
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <Link to="/stories" className="block  w-fit">
            <CommonButton styles="w-fit text-md" size="md">
              Read All Stories
            </CommonButton>
          </Link>
        </div>
      </section>

      <section className="flex justify-end px-44  bg-black text-white items-center    min-h-screen">
        <div>
          <div className=" space-y-2">
            <p className="title2">Subscribe</p>

            <p className="body2">
              Subscribe to our newsletter and get upto 40% off on our exclusive
              service.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribe to our newsletter");
              }}
              className="space-y-6"
            >
              <TextInput
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                placeholder="Enter Your Email"
                type="email"
                className="mt-8 invert"
                // error=""
              />
              <div className="flex justify-end">
                <CommonButton type="submit" styles="w-fit invert" size="sm">
                  Subscribe
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
