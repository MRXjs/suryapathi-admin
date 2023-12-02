import axios from "axios";
import { toastError } from "../functions/toast";

axios.defaults.withCredentials = true;
export const login = async (e, router) => {
  const loginCredential = {
    username: e.target.username.value,
    password: e.target.password.value,
  };

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
      loginCredential
    );
    localStorage.setItem("token", resp.data.token);
    router.push("/");
  } catch (error) {
    toastError(error.message && error.message);
  }
};
