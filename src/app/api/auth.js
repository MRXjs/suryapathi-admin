import axios from "axios";

export const login = async (username, password, router) => {
  const loginCredential = {
    username,
    password,
  };
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
      loginCredential
    );
    console.log("done");
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
