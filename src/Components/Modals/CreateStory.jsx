import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import cross from "../../assets/icons/cross.svg";
import TextInput from "../Common/TextInput";
import { showToastMessage } from "../../utils/helpers";
import CommonButton from "../Common/CommonButton";
import SelectDropdown from "../Common/SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDropdown } from "../../features/dropdown";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];
const CreateStory = ({
  open,
  toggleOpen,
  storyId,
  fields,
  params,
  setParams,
  handleChange,
  handleSubmit,
  errors,
}) => {
  const [tag, setTag] = useState("");

  const { categories } = useSelector((state) => state.dropdown);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryDropdown());
  }, []);

  // const HandleTags = (e) => {
  //   let newTag = tag.startsWith("#") ? tag.slice(1) : tag;

  //   if (params.tags.includes(newTag)) {
  //     showToastMessage("Tag already exists", "error");
  //     return;
  //   }

  //   setParams({ ...params, tags: [...params.tags, newTag] });

  //   setTag("");
  // };

  const handleTagChange = (e) => {
    const input = e.target.value;

    if (input.includes(",")) {
      let newTag = input.replace(",", "").trim();

      newTag = newTag.startsWith("#") ? newTag.slice(1) : newTag;

      if (params.tags.includes(newTag)) {
        showToastMessage("Tag already exists", "error");
      } else if (newTag) {
        setParams({ ...params, tags: [...params.tags, newTag] });
      }

      setTag("");
    } else {
      setTag(input);
    }
  };

  const getStoryByID = () => {
    axiosInstance
      .get(`/stories/${storyId}`)
      .then((res) => {
        setParams({
          ...params,
          title: res?.data?.story?.title,
          description: res?.data?.story?.description,
          tags: res?.data?.story?.tags,
          category: res?.data?.story?.category?._id,
        });
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  useEffect(() => {
    storyId && open && getStoryByID();
  }, [storyId]);

  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center m-auto w-full h-screen ${
        open ? "z-[999] bg-black-50 backdrop-blur-xl" : "-z-[999]"
      }`}
    >
      {open ? (
        <div className=" bg-white  rounded-xl shadow-2xl  p-6 space-y-4 overflow-auto w-11/12 h-[80vh] lg:h-[90vh] ">
          <div className="flex items-center justify-between ">
            <h2 className="text-2xl">
              {storyId ? "Edit" : "Write"} Your Story
            </h2>

            <button
              onClick={() => {
                setParams(fields);
                toggleOpen();
              }}
              className=""
            >
              <img src={cross} alt="cross" />
            </button>
          </div>

          <TextInput
            type="text"
            name="title"
            placeholder="Enter Title"
            className="placeholder:text-sm bg-transparent border text-black w-full py-3 border-slate-600"
            value={params?.title}
            onChange={handleChange}
            error={errors?.title}
          />

          <textarea
            required
            className="placeholder:text-sm w-full h-[50%] bg-transparent border border-slate-600 font-normal text-black"
            placeholder="Write your interesting story and attract people towards you..."
            name="description"
            value={params?.description}
            onChange={handleChange}
          />

          <div className="flex  justify-between ">
            <div className="flex  items-center  gap-2 flex-wrap">
              <div className=" space-y-4  ">
                <div className="flex gap-4  items-center w-full">
                  <input
                    type="text"
                    name="tag"
                    // onKeyDown={handleKeyDown}
                    className="bg-transparent text-black border w-full placeholder:text-sm py-3 border-slate-600"
                    placeholder="Enter tag name"
                    value={tag}
                    onChange={handleTagChange}
                  />
                  <SelectDropdown
                    showvalue="_id"
                    name="category"
                    value={params.category}
                    onChange={handleChange}
                    // options={categories}
                    options={categories}
                    placeholder="Choose category"
                    error={errors.category}
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {params?.tags?.filter(isNaN)?.map((item, index) => {
                    return (
                      <div className="cursor-pointer bg-orange-300 hover:bg-orange-200 rounded-xl text-black  px-2 py-1">
                        {`#${item}`}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end">
            <CommonButton size="lg" onClick={handleSubmit}>
              Post
            </CommonButton>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreateStory;
