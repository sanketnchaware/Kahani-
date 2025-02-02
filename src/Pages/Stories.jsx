import React, { useEffect, useRef, useState } from "react";
import CreateStory from "../Components/Modals/CreateStory";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import axiosInstance from "../utils/axiosInstance";
import cross from "../assets/icons/cross.svg";
import Loading from "../Components/Loading/Loading";
import { showToastMessage } from "../utils/helpers";
import CommonButton from "../Components/Common/CommonButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const { stories } = useSelector((state) => state.stories);

  console.log(stories, "storiesList");

  gsap.registerPlugin(ScrollTrigger);

  const [openCreateStory, setCreateOpenStory] = useState();
  const [loading, setLoading] = useState(false);

  const [storyId, SetStoryId] = useState("");

  const toggleStoryModal = () => {
    setCreateOpenStory(!openCreateStory);
  };

  const fields = {
    title: "",
    description: "",
    tags: [],
  };

  const [params, setParams] = useState(fields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const main = useRef(null);

  function deleteStory(id) {
    console.log("Sending DELETE request for story ID:", id); //  log
    axiosInstance
      .delete(`/stories/${id}`)
      .then((res) => {
        console.log("Story deleted successfully:", res);
      })
      .catch((err) => {
        console.log("Error deleting story:", err);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    storyId
      ? axiosInstance
          .patch(`/stories/${storyId}`, params)
          .then((res) => {
            SetStoryId("");
            setParams(fields);
            toggleStoryModal();
            showToastMessage("Story updated successfully", "success");
          })
          .catch((err) => {
            console.log("err:", err);
          })
          .finally(() => {})
      : axiosInstance
          .post("/stories", params)
          .then((res) => {
            toggleStoryModal();
            setParams(fields);
            showToastMessage("Story Added successfully", "success");
          })
          .catch((err) => {
            console.log("err:", err);
          })
          .finally(() => {});
  };

  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        <div ref={main} className="HomemainContainer mt-24  min-h-screen ">
          <div className="middleContainer flex gap-10 justify-between w-9/12 m-auto  h-full p-2 overflow-y-auto">
            <div className="space-y-4 w-7/12 ">
              <div className=" space-y-4">
                <h4 className="border-t border-b ">For You</h4>

                <input
                  placeholder="Search story.."
                  type="text"
                  className="bg-transparent text-black outline-none border px-4 py-2 rounded-lg w-full"
                />

                {/* <CommonButton size="sm" styles="w-fit" variant="primary">
                  Search
                </CommonButton> */}
              </div>

              {/* <div className="flex items-center justify-center gap-4">
                <p className="title5">
                  Do you have your story? Express it for free..
                </p>
                <Link to="/create-story" className="underline">
                  Write now..
                </Link>
              </div> */}

              {React.Children.toArray(
                stories?.length > 0 ? (
                  <div className="bg-slate-200   space-y-6 p-4 rounded-xl">
                    {stories?.map((item, index) => (
                      <div
                        key={item?.id}
                        className="shadow-sameshadow bg-white w-full p-4 h-full text-black rounded-xl "
                      >
                        <div className="flex justify-between items-center  gap-4">
                          <div className="h-40 w-4/12 rounded-xl overflow-hidden">
                            <img
                              className="object-cover   w-full"
                              src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                              alt=""
                            />{" "}
                          </div>
                          <div className="w-8/12">
                            <p className="body1b">
                              <span className="">{item?.title}</span>
                            </p>
                            <p className="body4 font-wendy">
                              {item?.description}
                            </p>
                            <div className="flex mt-4 justify-between items-center ">
                              <div className="flex   items-center gap-1">
                                <img
                                  className="object-cover    w-6 h-6 flex-shrink-0 rounded-full"
                                  src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                                  alt=""
                                />
                                <p className="text-lg font-bold ">Mr. Sanket</p>
                              </div>

                              <CommonButton styles="w-fit text-sm" size="sm">
                                <Link
                                  className="block underline  body3b"
                                  to="/"
                                >
                                  Read More
                                </Link>
                              </CommonButton>
                            </div>
                            {/* <div className="flex items-center gap-2 flex-wrap">
                          {item?.tags?.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                              className="bg-gray-200 body3b rounded-xl text-black px-3 py-1"
                            >
                              #{tag}
                            </div>
                          ))}
                        </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-[40vh]">
                    No Stories Found!
                  </div>
                )
              )}
            </div>
            <div className="w-5/12">
              <div className="flex  justify-end  mb-12">
                <CommonButton styles="w-fit text-xl" size="sm">
                  Create Account
                </CommonButton>
              </div>
              <div className="space-y-4">
                <div className="p-4 space-y-4 rounded-xl bg-slate-200 ">
                  <p className="title4">Trending</p>

                  {React.Children.toArray(
                    stories?.length > 0 ? (
                      <div className="bg-slate-200   space-y-6  rounded-xl">
                        {stories?.map((item, index) => (
                          <div
                            key={item?.id}
                            className="shadow-sameshadow bg-white w-full p-4 h-full text-black rounded-xl "
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-20  w-3/12 rounded-xl overflow-hidden">
                                <img
                                  className="object-cover w-full"
                                  src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                                  alt=""
                                />{" "}
                              </div>
                              <div className="">
                                <p className="body1b">
                                  <span className="">{item?.title}</span>
                                </p>

                                <div className="flex mt-1 justify-between items-center ">
                                  <div className="flex items-center gap-1">
                                    <img
                                      className="object-cover w-6 h-6 flex-shrink-0 rounded-full"
                                      src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                                      alt=""
                                    />
                                    <p className="body3 font-bold ">
                                      Mr. Sanket
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-[40vh]">
                        No Stories Found!
                      </div>
                    )
                  )}
                </div>

                <div className="p-4 rounded-xl space-y-4 bg-slate-200 ">
                  <p className="title4">Recommended Users</p>
                  {React.Children.toArray(
                    stories?.length > 0 ? (
                      <div className="bg-slate-200   space-y-6  rounded-xl">
                        {stories?.map((item, index) => (
                          <div
                            key={item?.id}
                            className="shadow-sameshadow bg-white w-full p-4 h-full text-black rounded-xl "
                          >
                            <div className="flex  justify-between items-center ">
                              <div className="flex   items-center gap-1">
                                <img
                                  className="object-cover    w-6 h-6 flex-shrink-0 rounded-full"
                                  src="https://images.pexels.com/photos/3770357/pexels-photo-3770357.jpeg?auto=compress&cs=tinysrgb&w=600"
                                  alt=""
                                />
                                <p className="body2b font-bold ">Mr. Sanket</p>
                              </div>

                              <CommonButton size="sm" styles="w-fit text-xs" >Follow</CommonButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-[40vh]">
                        No Stories Found!
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <CreateStory
          params={params}
          setParams={setParams}
          handleChange={handleChange}
          open={openCreateStory}
          storyId={storyId}
          fields={fields}
          toggleOpen={toggleStoryModal}
          handleSubmit={handleSubmit}
        />
      </>
    );
};

export default Home;
