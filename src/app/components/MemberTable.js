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
import { getAllMember, memberDelete } from "@/app/api/member";
import { BsFillTrashFill } from "react-icons/Bs";
import { FaPencil } from "react-icons/fa6";
import MemberUpdatePopup from "./MemberUpdatePopup";
import {
  approvalStatus,
  castes,
  districts,
  maritalStatus,
  monthlyIncomes,
  nations,
  professions,
  religions,
} from "@/DB/selecterOptions";
import {
  calculateAge,
  getCasteValue,
  getNationValue,
  getOptionsValue,
  getProfessionValue,
  getReligionValue,
} from "../functions/functions";
import ReactPaginate from "react-paginate";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const MemberTable = ({ searchTerm, tableWFull, columnFilters }) => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper();
  const [isMemberUpdatePopup, setIsMemberUpdatePopup] = useState(false);
  const [currentRow, setCurrentRow] = useState({});

  // fetchData
  const fetchData = async (pg) => {
    setIsLoading(true);
    const resp = await getAllMember(pg);
    setData(resp.rows);
    setPageCount(Math.ceil(resp.count / 10));
    setIsLoading(false);
    try {
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const onChangePage = ({ selected }) => {
    setData([]);
    setCurrentPage(selected);
    fetchData(selected + 1);
  };

  const approvalHandler = (e) => {
    setData((prevData) => {
      const updatedData = prevData.map((row) => {
        if (row.id == e.target.id) {
          return {
            ...row,
            approval: JSON.parse(e.target.value),
          };
        }
        return row;
      });

      return updatedData;
    });
  };

  const columns = [
    columnHelper.accessor("profile_image_url", {
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
    columnHelper.accessor("full_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Name",
    }),
    columnHelper.accessor("birthday", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Birth Day",
    }),
    columnHelper.accessor("age", {
      cell: (info) => <span>{calculateAge(info.row.original.birthday)}</span>,
      header: "Age",
    }),
    columnHelper.accessor("height", {
      cell: (info) => (
        <span>{`Feet : ${info.row.original.feet} Inch : ${info.row.original.inches}`}</span>
      ),
      header: "Height",
    }),
    columnHelper.accessor("nic", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "NIC",
    }),
    columnHelper.accessor("phone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Phone Number",
    }),
    columnHelper.accessor("nation", {
      cell: (info) => <span>{getOptionsValue(nations, info.getValue())}</span>,
      header: "Nation",
    }),
    columnHelper.accessor("religion", {
      cell: (info) => (
        <span>{getOptionsValue(religions, info.getValue())}</span>
      ),
      header: "Religion",
    }),
    columnHelper.accessor("caste", {
      cell: (info) => <span>{getOptionsValue(castes, info.getValue())}</span>,
      header: "caste",
    }),
    columnHelper.accessor("job", {
      cell: (info) => (
        <span>{getOptionsValue(professions, info.getValue())}</span>
      ),
      header: "Job",
    }),
    columnHelper.accessor("address", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Address",
    }),
    columnHelper.accessor("district", {
      cell: (info) => (
        <span>{getOptionsValue(districts, info.getValue())}</span>
      ),
      header: "District",
    }),
    columnHelper.accessor("married_status", {
      cell: (info) => (
        <span>{getOptionsValue(maritalStatus, info.getValue())}</span>
      ),
      header: "Marital Status",
    }),
    columnHelper.accessor("salary", {
      cell: (info) => (
        <span>{getOptionsValue(monthlyIncomes, info.getValue())}</span>
      ),
      header: "Monthly Income",
    }),
    columnHelper.accessor("approvell_status", {
      cell: (info) => (
        <select
          onChange={approvalHandler}
          value={info.getValue()}
          id={info.row.original.id}
          class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
            info.row.original.approvell_status
              ? "text-green-400 font-semibold"
              : "text-white"
          } } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          {approvalStatus.map((state, index) => (
            <option key={index} value={state.value}>
              {state.text}
            </option>
          ))}
        </select>
      ),
      header: "Approval",
    }),

    columnHelper.accessor("", {
      cell: (info) => (
        <div className="flex items-center justify-center">
          <button className="m-3">
            <FaPencil
              size={25}
              color={
                info.row.original.approval == "true" ||
                info.row.original.approval == true
                  ? "#4ade80"
                  : "white"
              }
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
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {isMemberUpdatePopup ? (
        <MemberUpdatePopup
          open={isMemberUpdatePopup}
          rowData={currentRow}
          onClose={() => setIsMemberUpdatePopup(false)}
        />
      ) : null}

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
                          row.original.approval ? " text-green-400" : ""
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

export default MemberTable;
