import axios from "axios";
import { toastError, toastSuccess } from "../functions/toast";

export const getAllAstrologyReq = async (pageNumber, columnFilters) => {
  try {
    const params = new URLSearchParams();
    if (columnFilters.payment_status !== "all") {
      params.append("payment_status", columnFilters.payment_status);
    }

    if (columnFilters.payment_method !== "all") {
      params.append("payment_method", columnFilters.payment_method);
    }

    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/astrology/all/${pageNumber}?${params}`
    );
    return resp.data;
  } catch (error) {
    toastError(error.message && error.message);
    return null;
  }
};

export const astroReqDelete = async (id, setData) => {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/astrology/delete`,
      { id }
    );
    setData((previous) => {
      return previous.filter((row) => row.id !== id);
    });
    toastSuccess(resp.data && resp.data.message);
  } catch (error) {
    toastError(error.message && error.message);
  }
};

export const astrologyReqPaymentStatusChange = async (e, data, setData) => {
  const currentRow = data.find((row) => row.id == e.target.id);
  if (!currentRow) return;

  const newPaymentStatus = !currentRow.payment_status;
  const sendData = {
    id: currentRow.id,
    payment_status: newPaymentStatus,
  };

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/astrology/update`,
      sendData
    );
    setData((prevData) => {
      const updatedData = prevData.map((row) => {
        if (row.id == e.target.id) {
          return {
            ...row,
            payment_status: newPaymentStatus,
          };
        }
        return row;
      });

      return updatedData;
    });
    toastSuccess(resp.data.message);
  } catch (error) {
    toastError(error.message && error.message);
  }
};

export const astrologyReqCompleteStateChange = async (e, data, setData) => {
  const currentRow = data.find((row) => row.id == e.target.id);
  if (!currentRow) return;

  const newStatus = !currentRow.complete_status;
  const sendData = {
    id: currentRow.id,
    status: newStatus,
  };

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/astrology/complete-status`,
      sendData
    );
    setData((prevData) => {
      const updatedData = prevData.map((row) => {
        if (row.id == e.target.id) {
          return {
            ...row,
            complete_status: newStatus,
          };
        }
        return row;
      });
      return updatedData;
    });
    toastSuccess(resp.data.message);
  } catch (error) {
    toastError(error.message && error.message);
  }
};
