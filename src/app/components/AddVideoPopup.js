import React from "react";
import BtnRed from "./BtnRed";
import FormError from "./FormError";
import { useForm } from "react-hook-form";
import { formValidations } from "@/DB/formValidations";
import { videoCreate } from "../api/videoGallery";

const AddVideoPopup = ({ setIsLoading, open, onClose }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const formSubmitHandler = async (data) => {
    setIsLoading(true);
    await videoCreate(data);
    reset();
    setIsLoading(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center !h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* model container */}
      <div
        className="w-auto p-4 overflow-y-auto bg-white "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn */}
        <p
          onClick={onClose}
          className="fixed text-3xl cursor-pointer top-72 text-[#b83737] hover:text-[#ff6060] "
        >
          X
        </p>

        <div className="flex mx-auto overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="px-4 py-16 sm:px-12 ">
            <h2 className="mb-4 text-3xl text-center">Add Video</h2>
            <form
              id="videoAddForm"
              onSubmit={handleSubmit(formSubmitHandler)}
              noValidate
              className="w-[500px]"
            >
              <div className="mt-8" required>
                <input
                  type="text"
                  id="title"
                  name="title"
                  {...register("title", {
                    required: formValidations.videoTitle.required.message,
                  })}
                  placeholder="Title"
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                />
                {errors.title ? (
                  <FormError error={errors.title.message} />
                ) : null}
              </div>
              <div className="mt-8">
                <input
                  id="url"
                  name="url"
                  {...register("url", {
                    required: formValidations.videoURL.required.message,
                    pattern: {
                      value: formValidations.videoURL.pattern.stringPattern,
                      message: formValidations.videoURL.pattern.message,
                    },
                  })}
                  placeholder="URL"
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                />
                {errors.url ? <FormError error={errors.url.message} /> : null}
              </div>

              <div className="grid grid-cols-2 gap-5 mt-10">
                <button
                  id="submitBtn"
                  name="submitBtn"
                  className="py-3 mb-2 mr-2 font-bold text-center text-white bg-purple-500 rounded-lg hover:bg-purple-600 w-fullpx-5"
                  type="submit"
                >
                  Submit
                </button>

                <BtnRed
                  text={"Clear"}
                  onClick={() => {
                    reset();
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideoPopup;
