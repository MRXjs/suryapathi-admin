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
import fetchedData from "@/DB/proposalReq.json";
import { paymentStatus, reqStatus } from "@/DB/selecterOptions";
import { BsFillTrashFill } from "react-icons/Bs";
import { astroReqDelete } from "../api/astroReq";
import { FcApproval, FcHighPriority } from "react-icons/fc";

const ProposalReqTable = ({ searchTerm, tableWFull }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper();
  const [data, setData] = useState(() => [...fetchedData]);

  const paymentStatusHandler = (e) => {
    setData((prevData) => {
      const updatedData = prevData.map((row) => {
        if (row.id == e.target.id) {
          return {
            ...row,
            payment_status: JSON.parse(e.target.value),
          };
        }
        return row;
      });

      return updatedData;
    });
  };

  const statusHandler = (e) => {
    setData((prevData) => {
      const updatedData = prevData.map((row) => {
        if (row.id == e.target.id) {
          return {
            ...row,
            status: JSON.parse(e.target.value),
          };
        }
        return row;
      });

      return updatedData;
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const columns = [
    columnHelper.accessor("status", {
      cell: (info) => (
        <span>
          {info.renderValue() ? (
            <div className=" animate-pulse">
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
    columnHelper.accessor("full_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Phone Number",
    }),
    columnHelper.accessor("description", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Description",
    }),
    columnHelper.accessor("service", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Service",
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
    columnHelper.accessor("status", {
      cell: (info) => (
        <select
          id={info.row.original.id}
          onChange={statusHandler}
          value={info.getValue()}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            info.getValue() ? "!text-green-400" : ""
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
    columnHelper.accessor("payment_method", {
      cell: (info) => (
        <span>{info.getValue() ? "Online" : "Bank Transfer"}</span>
      ),
      header: "Payment method",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex items-center justify-start">
          <button className="p-3">
            <BsFillTrashFill
              size={25}
              color="red"
              onClick={() => astroReqDelete(0)}
            />
          </button>
        </div>
      ),
      header: "Actions",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setGlobalFilter(searchTerm);
  }, [searchTerm]);

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
          <div className="flex items-center justify-end gap-2 my-5">
            <button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="p-1 px-2 font-bold text-white bg-blue-500 border border-gray-300 disabled:opacity-30 hover:bg-blue-700"
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="p-1 px-2 font-bold text-white bg-blue-500 border border-gray-300 disabled:opacity-30 hover:bg-blue-700"
            >
              {">"}
            </button>
            <span className="flex items-center gap-1">
              <div>page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              Go to page:{" "}
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="w-16 p-1 bg-transparent border rounded"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="p-2 bg-transparent "
            >
              {[5, 10, 20, 30, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalReqTable;
