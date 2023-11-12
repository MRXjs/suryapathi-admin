import axios from "axios";

export const login = async (username, password, router) => {
  "use server";
  const loginCredential = {
    username,
    password,
  };
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
      loginCredential
    );
    Cookies.set("token", resp.data.token, { expires: 7 });
    // router.push("/");
  } catch (error) {
    console.log(error);
  }
};
