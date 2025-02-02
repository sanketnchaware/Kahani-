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
const Profile = () => {
  gsap.registerPlugin(ScrollTrigger);

  const [openCreateStory, setCreateOpenStory] = useState();
  const [loading, setLoading] = useState(false);

  const [stories, setStories] = useState([]);
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

  function GetStories() {
    setLoading(true);
    axiosInstance
      .get("/stories")
      .then((res) => {
        setStories(res.data.stories);
      })
      .catch((err) => {
        console.log("err:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function deleteStory(id) {
    console.log("Sending DELETE request for story ID:", id); // Debug log
    axiosInstance
      .delete(`/stories/${id}`)
      .then((res) => {
        console.log("Story deleted successfully:", res);
        GetStories(); // Re-fetch stories after deletion
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
            GetStories();
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
            GetStories();
          })
          .catch((err) => {
            console.log("err:", err);
          })
          .finally(() => {});
  };

  useEffect(() => {
    GetStories();
  }, []);

  if (loading) {
    return <Loading />;
  } else
    return (
      <>
        <div
          ref={main}
          className="HomemainContainer mt-12 col-span-12 min-h-screen grid grid-cols-12"
        >
          <div className="p-6 sticky top-12 h-screen lg:block hidden leftcontainer shadow-sameshadow space-y-6 col-span-3">
            Filter
          </div>
          <div className="middleContainer w-full space-y-6 p-6 lg:col-span-6 col-span-12 h-full overflow-y-auto">
            <div className="w-full space-y-6 pt-6">
              <div className="flex items-center gap-4">
                <input
                  placeholder="Search your favourite story.."
                  type="text"
                  className="bg-transparent text-black outline-none border px-4 py-2 rounded-lg w-full"
                />
                <CommonButton size="md" styles="w-fit" variant="primary">
                  Search
                </CommonButton>
              </div>

              <div className="flex justify-center gap-4">
                <p className="title5">Do you have your story?</p>
                <CommonButton
                  onClick={toggleStoryModal}
                  styles="w-fit"
                  variant="secondary"
                >
                  Add
                </CommonButton>
              </div>
            </div>

            {React.Children.toArray(
              stories?.length > 0 ? (
                <div className=" space-y-6">
                  {stories?.map((item, index) => (
                    <div
                      key={item.id}
                      className="space-y-4 shadow-sameshadow text-black rounded-xl p-4"
                    >
                      <div className="flex justify-between">
                        <p className="body2b">
                          {index + 1}. <span className="">{item?.title}</span>
                        </p>
                        <button onClick={() => deleteStory(item?.id)}>
                          <img src={cross} alt="cross" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <p className="body3 font-wendy">{item?.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {item?.tags?.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                              className="bg-gray-200 body3b rounded-xl text-black px-3 py-1"
                            >
                              #{tag}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="justify-end flex">
                        <button
                          className="contained_button"
                          onClick={() => {
                            SetStoryId(item?.id);
                            toggleStoryModal();
                          }}
                        >
                          Edit
                        </button>
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
          <div className="shadow-sameshadow  lg:block hidden rightcontainer p-6 space-y-6 col-span-3 sticky top-12 h-screen">
            My profile
          </div>
        </div>

        <CreateStory
          params={params}
          setParams={setParams}
          handleChange={handleChange}
          open={openCreateStory}
          storyId={storyId}
          fields={fields}
          GetStories={GetStories}
          toggleOpen={toggleStoryModal}
          handleSubmit={handleSubmit}
        />
      </>
    );
};

export default Profile;
