import axios from "axios";
import { toastError, toastSuccess } from "../functions/toast";
import { dataURItoFile } from "../functions/functions";

export const getAllMember = async (pageNumber, columnFilters, globalFilter) => {
  try {
    const params = new URLSearchParams();

    if (columnFilters.memberApproval !== "all") {
      params.append("approvel_status", columnFilters.memberApproval);
    }

    if (globalFilter) {
      params.append("search", globalFilter);
    }

    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/all-with-data/${pageNumber}?${params}`
    );
    return resp.data;
  } catch (error) {
    toastError(error.message && error.message);
    return null;
  }
};

export const memberCreate = async (data) => {
  let formData = new FormData();

  formData.append(
    "image",
    await dataURItoFile(localStorage.getItem("avatar"), `${data.name}.jpg`)
  );

  formData.append("full_name", data.name);
  formData.append(
    "birthday",
    `${data.birthYear}-${data.birthMonth}-${data.birthDay}`
  );
  formData.append("phone", data.phoneNo);
  formData.append("nic", data.nicNo);
  formData.append("feet", data.heightFeet);
  formData.append("inches", data.heightInch);
  formData.append("nation", data.nation);
  formData.append("religion", data.religion);
  formData.append("caste", data.caste);
  formData.append("married_status", data.maritalState);
  formData.append("address", data.address);
  formData.append("district", data.district);
  formData.append("job", data.profession);
  formData.append("salary", data.monthlyIncome);
  formData.append("gender", data.gender);

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/member/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toastSuccess(resp.data.message);
  } catch (error) {
    toastError(error.response ? error.response.data.error : error.message);
  }
};

export const memberSearch = async (e) => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/search?${e.target.searchColumn.value}=${e.target.searchTeam.value}`
    );
    return resp.data;
  } catch (error) {
    toastError(error.message && error.message);
    return null;
  }
};

export const memberDelete = (id) => {
  if (confirm("Are you sure you want to delete?")) {
    console.log("member deleted!");
  } else {
    console.log("member was not deleted!");
  }
};

export const memberUpdate = (id, data) => {};
