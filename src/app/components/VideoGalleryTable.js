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
import ReactPaginate from "react-paginate";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { BsFillTrashFill } from "react-icons/Bs";
import { toastError } from "../functions/toast";
import { getAllVideo, videoDelete } from "../api/videoGallery";
import {
  convertTo12HourFormatWithoutSeconds,
  formatDateTime,
} from "../functions/functions";

const VideoGalleryTable = ({
  setIsLoading,
  setData,
  data,
  columnFilters,
  tableWFull,
  setCurrentRow,
  openVideoViewer,
}) => {
  const router = useRouter();
  const columnHelper = createColumnHelper();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // fetchData
  const fetchData = async (pg) => {
    try {
      setIsLoading(true);
      const resp = await getAllVideo(pg, router);
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

  const rowDelete = async (id) => {
    setIsLoading(true);
    if (confirm("Are you sure you want to delete?")) {
      await videoDelete(id, setData, router);
    }
    setIsLoading(false);
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Title",
    }),
    columnHelper.accessor("video_id", {
      cell: (info) => <span>{`https://youtu.be/${info.getValue()}`}</span>,
      header: "URL",
    }),
    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex ">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              setCurrentRow(info.row.original);
              openVideoViewer();
            }}
          >
            View
          </button>

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
    columnHelper.accessor("created-date", {
      cell: (info) => (
        <span>
          {formatDateTime(info.row.original.created_at).formattedDate}
        </span>
      ),
      header: "Created Date",
    }),
    columnHelper.accessor("created-time", {
      cell: (info) => (
        <span>
          {convertTo12HourFormatWithoutSeconds(
            formatDateTime(info.row.original.created_at).formattedTime
          )}
        </span>
      ),
      header: "Created Time",
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

export default VideoGalleryTable;
