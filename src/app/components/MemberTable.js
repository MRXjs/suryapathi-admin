"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { memberDelete } from "@/app/api/proposal";
import { BsFillTrashFill } from "react-icons/Bs";
import { FaPencil } from "react-icons/fa6";
import MemberUpdatePopup from "./MemberUpdatePopup";

const MemberTable = ({ memberData, searchTerm, tableWFull }) => {
  const [data] = useState(() => [...memberData]);
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper();
  const [isMemberUpdatePopup, setIsMemberUpdatePopup] = useState(false);
  const [currentRow, setCurrentRow] = useState({});

  const columns = [
    columnHelper.accessor("img", {
      cell: (info) => (
        <Image
          alt={""}
          src={info.getValue()}
          width={50}
          height={50}
          className="object-cover w-10 h-10 rounded-full"
        />
      ),
      header: "Picture",
    }),
    columnHelper.accessor("id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),
    columnHelper.accessor("birthDay", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Birth Day",
    }),
    columnHelper.accessor("age", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Age",
    }),
    columnHelper.accessor("height", {
      cell: (info) => (
        <span>{`Feet : ${info.row.original.feet} Inch : ${info.row.original.inch}`}</span>
      ),
      header: "Height",
    }),
    columnHelper.accessor("nicNo", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "NIC No",
    }),
    columnHelper.accessor("mobileNumber", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Phone Number",
    }),
    columnHelper.accessor("nation", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Nation",
    }),
    columnHelper.accessor("religion", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Religion",
    }),
    columnHelper.accessor("caste", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "caste",
    }),
    columnHelper.accessor("job", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Job",
    }),
    columnHelper.accessor("address", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Address",
    }),
    columnHelper.accessor("district", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "District",
    }),
    columnHelper.accessor("maritalStatus", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Marital Status",
    }),
    columnHelper.accessor("monthlyIncome", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Monthly Income",
    }),

    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex items-center justify-center">
          <button className="m-3">
            <FaPencil
              size={25}
              color="white"
              onClick={() => {
                setIsMemberUpdatePopup(true);
                setCurrentRow(info.row.original);
              }}
            />
          </button>
          pppp
          <button className="p-3">
            <BsFillTrashFill
              size={25}
              color="red"
              onClick={() => memberDelete(0)}
            />
          </button>
        </div>
      ),
      header: "Actions",
    }),
  ];

  useEffect(() => {
    setGlobalFilter(searchTerm);
  }, [searchTerm]);

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

  return (
    <div
      className={`p-5 mb-16 ${tableWFull ? "ml-72" : "ml-20"} duration-300  `}
    >
      {isMemberUpdatePopup ? (
        <MemberUpdatePopup
          open={isMemberUpdatePopup}
          rowData={currentRow}
          onClose={() => setIsMemberUpdatePopup(false)}
        />
      ) : null}
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
                    <td key={cell.id} className="px-3.5 py-2">
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
  );
};

export default MemberTable;