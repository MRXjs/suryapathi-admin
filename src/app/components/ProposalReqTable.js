"use client";
import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { paymentStatus, reqStatus } from "@/DB/selecterOptions";
import { BsFillTrashFill } from "react-icons/Bs";
import { FcApproval, FcHighPriority } from "react-icons/fc";
import {
  getAllProposalReq,
  proposalReqCompleteStateChange,
  proposalReqDelete,
  proposalReqPaymentStatusChange,
} from "../api/proposalReq";
import ReactPaginate from "react-paginate";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { weddingServicePricingPlans } from "@/DB/pricingPlans";
import PhoneNumber from "./PhoneNumber";
import { toastError, toastSuccess } from "../functions/toast";
import { useRouter } from "next/navigation";
import {
  convertTo12HourFormatWithoutSeconds,
  copyToClipboard,
  createProposalReqMsg,
  formatDateTime,
} from "../functions/functions";
import { getSomeMembers } from "../api/member";

const ProposalReqTable = ({
  setIsLoading,
  setData,
  data,
  columnFilters,
  tableWFull,
}) => {
  const router = useRouter();
  const columnHelper = createColumnHelper();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // fetchData
  const fetchData = async (pg) => {
    try {
      setIsLoading(true);
      const resp = await getAllProposalReq(pg, columnFilters, router);
      setData(resp.rows);
      setPageCount(Math.ceil(resp.count / 10));
      setIsLoading(false);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
    fetchData(1);
  }, [columnFilters]);

  const onChangePage = ({ selected }) => {
    setData([]);
    setCurrentPage(selected);
    fetchData(selected + 1);
  };

  const selectedMemberCopy = async (ids) => {
    setIsLoading(true);
    try {
      const data = await getSomeMembers(ids, router);
      const text = await createProposalReqMsg(data);
      await copyToClipboard(text);
      toastSuccess(`Successfully copied data ${ids}`);
    } catch (error) {
      toastError(error);
    }
    setIsLoading(false);
  };

  const rowDelete = async (id) => {
    setIsLoading(true);
    if (confirm("Are you sure you want to delete?")) {
      await proposalReqDelete(id, setData, router);
    }
    setIsLoading(false);
  };

  const paymentStatusHandler = async (e) => {
    setIsLoading(true);
    await proposalReqPaymentStatusChange(e, data, setData, router);
    setIsLoading(false);
  };

  const statusHandler = async (e) => {
    setIsLoading(true);
    await proposalReqCompleteStateChange(e, data, setData, router);
    setIsLoading(false);
  };

  const columns = [
    columnHelper.accessor("showStatus", {
      cell: (info) => (
        <span>
          {info.row.original.complete_status ? (
            <div className="">
              <FcApproval size={35} />
            </div>
          ) : (
            <div className=" animate-pulse">
              <FcHighPriority size={35} />
            </div>
          )}
        </span>
      ),
      header: "",
    }),
    columnHelper.accessor("id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("fullName", {
      cell: (info) => (
        <span>{`${info.row.original.first_name} ${info.row.original.last_name}`}</span>
      ),
      header: "Name",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => (
        <PhoneNumber isGreen={info.row.original.payment_status} info={info} />
      ),
      header: "Phone Number",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Email",
    }),
    columnHelper.accessor("description", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Description",
    }),
    columnHelper.accessor("package_type", {
      cell: (info) => (
        <span>
          {weddingServicePricingPlans.map((plan) => (
            <div key={plan.id}>{plan.id === info.getValue() && plan.title}</div>
          ))}
        </span>
      ),
      header: "Selected Package",
    }),
    columnHelper.accessor("selected_members", {
      cell: (info) => (
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => {
            selectedMemberCopy(JSON.parse(info.getValue()));
          }}
        >
          Copy
        </button>
      ),
      header: "Selected Members",
    }),
    columnHelper.accessor("payment_status", {
      cell: (info) => (
        <select
          id={info.row.original.id}
          onChange={paymentStatusHandler}
          value={info.getValue()}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            info.getValue() ? "!text-green-400 font-bold" : ""
          }`}
        >
          {paymentStatus.map((state, index) => (
            <option
              key={index}
              value={state.value}
              className={`${
                state.value ? "text-green-400 font-bold" : " text-red-500"
              }`}
            >
              {state.text}
            </option>
          ))}
        </select>
      ),
      header: "Payment status",
    }),

    columnHelper.accessor("payment_method", {
      cell: (info) => (
        <span>{info.getValue() ? "Online" : "Bank Transfer"}</span>
      ),
      header: "Payment method",
    }),
    columnHelper.accessor("transaction_id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Transaction Id",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex items-center justify-start">
          <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <BsFillTrashFill
              size={25}
              color="white"
              onClick={() => {
                rowDelete(info.row.original.id);
              }}
            />
          </button>
        </div>
      ),
      header: "Actions",
    }),
    columnHelper.accessor("complete_status", {
      cell: (info) => (
        <select
          id={info.row.original.id}
          onChange={statusHandler}
          value={info.getValue()}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            info.row.original.payment_status ? "!text-green-400" : ""
          }`}
        >
          {reqStatus.map((state, index) => (
            <option
              key={index}
              value={state.value}
              className={`${state.value ? "text-green-400" : " text-red-500"}`}
            >
              {state.text}
            </option>
          ))}
        </select>
      ),
      header: "Status",
    }),
    columnHelper.accessor("submitted-date", {
      cell: (info) => (
        <span>
          {formatDateTime(info.row.original.created_at).formattedDate}
        </span>
      ),
      header: "Submitted Date",
    }),
    columnHelper.accessor("submitted-time", {
      cell: (info) => (
        <span>
          {convertTo12HourFormatWithoutSeconds(
            formatDateTime(info.row.original.created_at).formattedTime
          )}
        </span>
      ),
      header: "Submitted Time",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div
        className={`p-5 mb-16 ${tableWFull ? "ml-72" : "ml-20"} duration-300  `}
      >
        <table className="w-full mb-16 text-left text-white border border-gray-700">
          <thead className="bg-indigo-600">
            {table.getHeaderGroups().map((getHeaderGroup) => (
              <tr key={getHeaderGroup.id}>
                {getHeaderGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length
              ? table.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`
          ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
        `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-3.5 py-2 ${
                          row.original.payment_status ? " text-green-400" : ""
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {/* pagination */}
        <div className="fixed bottom-0 left-0 z-0 w-full bg-white ">
          <div className="flex items-center justify-end gap-2 my-5 mr-5 ">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<GrLinkNext size={20} />}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              previousLabel={<GrLinkPrevious size={20} />}
              pageCount={pageCount}
              onPageChange={onChangePage}
              containerClassName={"h-[50px] flex items-center "}
              pageLinkClassName={
                "px-2 sm:px-5 py-1 sm:py-2  m-[8px] rounded-[5px] border-2 border-solid border-black hover:bg-black hover:text-white transition duration-300"
              }
              activeClassName={
                "bg-black text-white  py-3  m-[8px] rounded-[5px]"
              }
              forcePage={currentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalReqTable;
