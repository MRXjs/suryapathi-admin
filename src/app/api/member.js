import axios from "axios";
import { toastError } from "../functions/toast";

export const getAllMember = async () => {
  try {
    const params = new URLSearchParams();
    // if (filterValues.filterGender)
    //   params.append("gender", filterValues.filterGender);
    // if (filterValues.filterNation)
    //   params.append("nation", filterValues.filterNation);
    // if (filterValues.filterAge) params.append("age", filterValues.filterAge);
    // if (filterValues.filterJob) params.append("job", filterValues.filterJob);

    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/member/all-with-data/${1}`
    );
    return resp.data;
  } catch (error) {
    toastError(error.message & error.message);
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
