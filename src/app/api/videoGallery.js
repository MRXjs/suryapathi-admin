import axios from "axios";
import { toastError, toastSuccess } from "../functions/toast";
import { extractVideoId } from "../functions/functions";
axios.defaults.withCredentials = true;

export const getAllVideo = async (pageNumber, router) => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/videogallery/all/${pageNumber}`
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

export const videoCreate = async (data, router) => {
  let formData = new FormData();
  formData.append("title", data.title);
  formData.append("video_id", extractVideoId(data.url));

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/videogallery/create`,
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

export const videoUpdate = (data) => {
  console.log(data);
};

export const videoDelete = async (id, setData, router) => {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/videogallery/delete`,
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
