import axios from "axios";
import { toastError, toastSuccess } from "../functions/toast";

export const getAllProposalReq = async (pageNumber, columnFilters) => {
  try {
    const params = new URLSearchParams();
    if (columnFilters.payment_status !== "all") {
      params.append("payment_status", columnFilters.payment_status);
    }
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/proposal/all/${pageNumber}?${params}`
    );
    return resp.data;
  } catch (error) {
    toastError(error.message && error.message);
    return null;
  }
};

export const proposalReqSearch = async (e) => {
  console.log(e);
};

export const proposalReqDelete = async (id, setData) => {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/proposal/delete`,
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

export const proposalReqPaymentStatusChange = async (e, data, setData) => {
  const currentRow = data.find((row) => row.id == e.target.id);
  if (!currentRow) return;

  const newPaymentStatus = !currentRow.payment_status;
  const sendData = {
    id: currentRow.id,
    payment_status: newPaymentStatus,
  };

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/proposal/update`,
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

export const proposalReqCompleteStateChange = async (e, data, setData) => {
  const currentRow = data.find((row) => row.id == e.target.id);
  if (!currentRow) return;

  const newStatus = !currentRow.complete_status;
  const sendData = {
    id: currentRow.id,
    complete_status: newStatus,
  };

  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/proposal/complete-status`,
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
