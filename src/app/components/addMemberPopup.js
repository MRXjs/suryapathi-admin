import React from "react";
import FormError from "./FormError";

const addMemberPopup = () => {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center !h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* model container */}
      <div
        className="w-auto h-screen p-4 overflow-y-auto bg-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* close btn */}
        <p
          onClick={onClose}
          className="fixed text-3xl cursor-pointer top-5   text-[#b83737] hover:text-[#ff6060] "
        >
          X
        </p>

        <div className="flex mx-auto overflow-hidden bg-white shadow-lg xl:w-8/12 rounded-xl">
          <div className="hidden w-1/2 md:inline-block image-container">
            <h1 className="mt-6 text-3xl text-center text-white">Welcome</h1>
            <div>
              <p className="px-2 text-xl text-center text-white lg:px-10">
                Ea aliquip aliquip dese runt aliqua tempor. Dolore sit quis qui
                amet sint aute. Tempor cupidatat laboris do pariatur ex do
                aliquip dolore ullamco sit mollit enim aliquip aute.
              </p>
            </div>
          </div>
          <div className="px-4 py-16 sm:px-12 md:w-1/2">
            <h2 className="mb-4 text-3xl text-center">
              ලියාපදිංචි කිරීමේ පෝරමය
            </h2>
            <form
              id="registrationForm"
              onSubmit={handleSubmit(formSubmitHandler)}
              noValidate
            >
              <div className="flex flex-col items-center justify-center ">
                <Avatar
                  selectedAvatar={watch("avatar") ? watch("avatar")[0] : ""}
                />

                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  required
                  {...register("avatar", {
                    required: formValidations.avatar.required.message,
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none cursor-pointer ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                />
              </div>
              {errors.avatar ? (
                <FormError error={errors.avatar.message} />
              ) : null}

              <div className="mt-8">
                <input
                  id="name"
                  name="name"
                  {...register("name", {
                    required: formValidations.name.required.message,
                  })}
                  placeholder="සම්පුර්න නම"
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                />
                {errors.name ? <FormError error={errors.name.message} /> : null}
              </div>
              <div className="mt-8">
                <span>උපන් දිනය</span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    id="birthYear"
                    name="birthYear"
                    {...register("birthYear", {
                      required: formValidations.birthDay.required.yearMessage,
                      maxLength: 4,
                      validate: (fieldValue) => isOlderThan16(fieldValue),
                    })}
                    placeholder="අවුරුද්ද"
                    className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                  />
                  <input
                    type="number"
                    id="birthMonth"
                    name="birthMonth"
                    {...register("birthMonth", {
                      required: formValidations.birthDay.required.monthMessage,
                      maxLength: 2,
                    })}
                    placeholder="මාසය"
                    className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                  />
                  <input
                    type="number"
                    id="birthDay"
                    name="birthDay"
                    {...register("birthDay", {
                      required: formValidations.birthDay.required.dayMessage,
                      maxLength: 2,
                    })}
                    placeholder="දිනය"
                    className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                {errors.birthYear ? (
                  <FormError error={errors.birthYear.message} />
                ) : null}
                {errors.birthMonth || errors.birthDay ? (
                  <FormError
                    error={
                      errors.birthMonth
                        ? errors.birthMonth.message
                        : errors.birthDay.message
                    }
                  />
                ) : null}
              </div>
              <div className="mt-8">
                <span>උස</span>
                <div className="grid grid-cols-2 gap-3 ">
                  <input
                    type="number"
                    id="heightFeet"
                    name="heightFeet"
                    {...register("heightFeet", {
                      // required: formValidations.heightFeet.required.message,
                    })}
                    placeholder="අඩි"
                    className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300 "
                  />
                  <input
                    type="number"
                    id="heightInch"
                    name="heightInch"
                    {...register("heightInch")}
                    placeholder="අඟල්"
                    className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                {errors.heightFeet ? (
                  <FormError error={errors.heightFeet.message} />
                ) : null}
              </div>
              <div className="mt-8">
                <select
                  id="gender"
                  name="gender"
                  {...register("gender", {
                    validate: (fieldValue) => {
                      return fieldValue !== "0" || "ඔබ Gender එක තෝරාගන්න.";
                    },
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                >
                  {gender.map((gender, index) => (
                    <option key={index} value={index}>
                      {gender.value}
                    </option>
                  ))}
                </select>
                {errors.gender ? (
                  <FormError error={errors.gender.message} />
                ) : null}
              </div>
              <div className="mt-8" required>
                <input
                  type="text"
                  id="nicNo"
                  name="nicNo"
                  {...register("nicNo", {
                    // required: formValidations.nicNo.required.message,
                    pattern: {
                      value: formValidations.nicNo.pattern.stringPattern,
                      message: formValidations.nicNo.pattern.message,
                    },
                  })}
                  placeholder="හැදුනුම්පත් අංකය"
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                />
                {errors.nicNo ? (
                  <FormError error={errors.nicNo.message} />
                ) : null}
              </div>
              <div className="mt-8">
                <input
                  id="phoneNo"
                  name="phoneNo"
                  {...register("phoneNo", {
                    // required: formValidations.phoneNo.required.message,
                    pattern: {
                      value: formValidations.phoneNo.pattern.stringPattern,
                      message: formValidations.phoneNo.pattern.message,
                    },
                  })}
                  placeholder="දුරකතන අංකය"
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                />
                {errors.phoneNo ? (
                  <FormError error={errors.phoneNo.message} />
                ) : null}
              </div>
              <div className="grid grid-cols-3 gap-5 mt-8">
                <select
                  id="nation"
                  name="nation"
                  {...register("nation", {
                    // validate: (fieldValue) => {
                    //   return fieldValue !== "0" || "ජාතිය";
                    // },
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                >
                  {nation.map((nation, index) => (
                    <option key={index} value={index}>
                      {nation.value}
                    </option>
                  ))}
                </select>

                <select
                  id="religion"
                  name="religion"
                  {...register("religion", {
                    // validate: (fieldValue) => {
                    //   return fieldValue !== "0" || "ආගම";
                    // },
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                >
                  {religions.map((religion, index) => (
                    <option key={index} value={index}>
                      {religion.value}
                    </option>
                  ))}
                </select>

                <select
                  id="caste"
                  name="caste"
                  {...register("caste", {
                    // validate: (fieldValue) => {
                    //   return fieldValue !== "0" || "කුලය";
                    // },
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                >
                  {castes.map((caste, index) => (
                    <option key={index} value={index}>
                      {caste.value}
                    </option>
                  ))}
                </select>
              </div>
              {errors.nation || errors.religion || errors.caste ? (
                <FormError
                  error={`ඔබේ ${errors.nation ? errors.nation.message : ""} ${
                    errors.religion ? errors.religion.message : ""
                  } ${errors.caste ? errors.caste.message : ""} තෝරාගන්න`}
                />
              ) : null}

              <div className="mt-8">
                <select
                  id="profession"
                  name="profession"
                  {...register("profession", {
                    validate: (fieldValue) => {
                      return fieldValue !== "0" || "ඔබෙ රැකියාව තෝරාගන්න.";
                    },
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none cursor-pointer ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                >
                  {professions.map((profession, index) => (
                    <option value={index} key={index}>
                      {profession.value}
                    </option>
                  ))}
                </select>
              </div>
              {errors.profession ? (
                <FormError error={errors.profession.message} />
              ) : null}
              <div className="mt-8">
                <input
                  id="address"
                  name="address"
                  {...register("address", {
                    // required: formValidations.address.required.message,
                  })}
                  placeholder="ස්තීර ලිපිනය"
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                />
                {errors.address ? (
                  <FormError error={errors.address.message} />
                ) : null}
              </div>
              <div className="mt-8">
                <select
                  id="district"
                  name="district"
                  {...register("district", {
                    validate: (fieldValue) => {
                      return (
                        fieldValue !== "0" || "ඔබ ජීවත්වන දිස්ත්‍රීකය තෝරාගන්න."
                      );
                    },
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none cursor-pointer ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                >
                  {districts.map((district, index) => (
                    <option
                      key={index}
                      value={index}
                      className="cursor-pointer"
                    >
                      {district.value}
                    </option>
                  ))}
                </select>
                {errors.district ? (
                  <FormError error={errors.district.message} />
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-5 mt-8">
                <select
                  id="maritalState"
                  name="maritalState"
                  {...register("maritalState", {
                    validate: (fieldValue) => {
                      return fieldValue !== "0" || "විවාහක තත්ත්වය";
                    },
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                >
                  {maritalStatus.map((state, index) => (
                    <option key={index} value={index}>
                      {state.value}
                    </option>
                  ))}
                </select>
                <select
                  id="monthlyIncome"
                  name="monthlyIncome"
                  {...register("monthlyIncome", {
                    // validate: (fieldValue) => {
                    //   return fieldValue !== "0" || " මාසික ආදායම ";
                    // },
                  })}
                  className="w-full px-4 py-2 mt-2 rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-teal-300"
                >
                  {monthlyIncomes.map((monthlyIncome, index) => (
                    <option key={index} value={index}>
                      {monthlyIncome.value}
                    </option>
                  ))}
                </select>
              </div>
              {errors.maritalState || errors.monthlyIncome ? (
                <FormError
                  error={`ඔබේ ${
                    errors.maritalState ? errors.maritalState.message : ""
                  } ${
                    errors.monthlyIncome ? errors.monthlyIncome.message : ""
                  } තෝරාගන්න.`}
                />
              ) : null}

              <div className="flex items-center mt-8">
                <input
                  id="acceptPolicy"
                  name="acceptPolicy"
                  {...register("acceptPolicy", {
                    required: "අපගෙ කොන්දෙසි වලට එකග විය යුතුයී.",
                  })}
                  type="checkbox"
                  className="w-5 h-5 border border-gray-400 cursor-pointer"
                />
              </div>
              {errors.acceptPolicy ? (
                <FormError error={errors.acceptPolicy.message} />
              ) : null}
              <div className="mt-8">
                <button
                  id="submitBtn"
                  name="submitBtn"
                  className="w-full py-3 font-bold text-center text-white bg-purple-500 rounded-lg"
                  type="submit"
                  disabled={isLoading ? true : false}
                >
                  ලියපදින්චි වන්න
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addMemberPopup;
