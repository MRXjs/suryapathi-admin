import axios from "axios";
import { toastError, toastSuccess } from "../functions/toast";

axios.defaults.withCredentials = true;
// getAllMember
export const getAllMember = async (pageNumber, columnFilters, router) => {
  try {
    const params = new URLSearchParams();

    if (columnFilters.memberApproval !== "all") {
      params.append("approvel_status", columnFilters.memberApproval);
    }
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/all-with-data/${pageNumber}?${params}`
    );
    return resp.data;
  } catch (error) {
    toastError(error.message && error.message);
    if (error.response && error.response.status === 401) {
      router.push("/auth");
    }
    return null;
  }
};

// memberCreate
export const memberCreate = async (avatarEditorRef, data, router) => {
  let avatar = null;
  if (avatarEditorRef.current) {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    avatar = await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "avatar.jpeg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          resolve(file);
        } else {
          resolve(null);
        }
      });
    });
  }

  let formData = new FormData();
  formData.append("image", avatar);
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
    if (error.response && error.response.status === 401) {
      router.push("/auth");
    }
  }
};

// memberSearch
export const memberSearch = async (e, router) => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/search?${e.target.searchColumn.value}=${e.target.searchTeam.value}`
    );
    return resp.data;
  } catch (error) {
    toastError(error.message && error.message);
    if (error.response && error.response.status === 401) {
      router.push("/auth");
    }
    return null;
  }
};

// memberDelete
export const memberDelete = async (id, setData, router) => {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/delete`,
      { id }
    );
    setData((previous) => {
      return previous.filter((row) => row.id !== id);
    });
    toastSuccess(resp.data && resp.data.message);
  } catch (error) {
    toastError(error.message && error.message);
    if (error.response && error.response.status === 401) {
      router.push("/auth");
    }
  }
};

// memberUpdate
export const memberUpdate = async (avatarEditorRef, row, router) => {
  try {
    let avatar = null;
    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImageScaledToCanvas();
      avatar = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "avatar.jpeg", {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(file);
          } else {
            resolve(null);
          }
        });
      });
    }

    let formData = new FormData();
    formData.append("image", avatar);
    formData.append("id", row.id);
    formData.append("full_name", row.full_name);
    formData.append("birthday", row.birthday);
    formData.append("phone", row.phone);
    formData.append("nic", row.nic);
    formData.append("feet", row.feet);
    formData.append("inches", row.inches);
    formData.append("nation", row.nation);
    formData.append("religion", row.religion);
    formData.append("caste", row.caste);
    formData.append("married_status", row.married_status);
    formData.append("address", row.address);
    formData.append("district", row.district);
    formData.append("job", row.job);
    formData.append("salary", row.salary);
    formData.append("gender", row.gender);

    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/update`,
      formData
    );
    toastSuccess(resp.data.message);
  } catch (error) {
    toastError(error.message && error.message);
    if (error.response && error.response.status === 401) {
      router.push("/auth");
    }
  }
};

// memberApprovalChange
export const memberApprovalChange = async (e, setData, router) => {
  try {
    const id = JSON.parse(e.target.id);
    const value = JSON.parse(e.target.value);

    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/approve-status`,
      { id, status: value }
    );
    setData((prevData) => {
      const updatedData = prevData.map((row) => {
        if (row.id == id) {
          return {
            ...row,
            approvel_status: value,
          };
        }
        return row;
      });

      return updatedData;
    });
    toastSuccess(resp.data.message);
  } catch (error) {
    toastError(error.message && error.message);
    if (error.response && error.response.status === 401) {
      router.push("/auth");
    }
  }
};

export const getSomeMembers = async (ids, router) => {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/some-with-data`,
      {
        ids,
      }
    );
    return resp.data;
  } catch (error) {
    toastError(error.message && error.message);
    if (error.response && error.response.status === 401) {
      router.push("/auth");
    }
  }
};
