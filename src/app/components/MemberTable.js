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
import {
  getAllMember,
  memberApprovalChange,
  memberDelete,
} from "@/app/api/member";
import { BsFillTrashFill } from "react-icons/Bs";
import { FaPencil } from "react-icons/fa6";
import MemberUpdatePopup from "./MemberUpdatePopup";
import {
  approvalStatus,
  castes,
  districts,
  gender,
  maritalStatus,
  monthlyIncomes,
  nations,
  professions,
  religions,
} from "@/DB/selecterOptions";
import {
  calculateAge,
  copyToClipboard,
  downloadImage,
  getOptionsValue,
} from "../functions/functions";
import ReactPaginate from "react-paginate";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { toastError, toastSuccess } from "../functions/toast";
import PhoneNumber from "./PhoneNumber";
import avatarLoader from "../../../public/avatar-loader.gif";

const MemberTable = ({
  data,
  setData,
  tableWFull,
  columnFilters,
  setIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [avatarLoading, setAvatarLoading] = useState(true);

  const columnHelper = createColumnHelper();
  const [popups, setPopups] = useState({
    isMemberUpdatePopup: false,
  });
  const [currentRow, setCurrentRow] = useState({});

  // fetchData
  const fetchData = async (pg) => {
    try {
      setIsLoading(true);
      const resp = await getAllMember(pg, columnFilters);
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
    setAvatarLoading(true);
    setCurrentPage(selected);
    fetchData(selected + 1);
  };

  const approvalHandler = async (e) => {
    setIsLoading(true);
    await memberApprovalChange(e, setData);
    setIsLoading(false);
  };

  const rowCopyToClipBoard = async (row) => {
    setIsLoading(true);
    const text = `
    නම : ${row.full_name}
    උපන් දිනය : ${row.birthday}
    වයස : ${calculateAge(row.birthday)}
    ස්ත්‍රී/පුරුෂ බාවය : ${getOptionsValue(gender, row.gender)}
    උස : අඩි ${row.feet} අඟල් ${row.inches}
    විවාහක තත්ත්වය : ${getOptionsValue(maritalStatus, row.married_status)}
    ජාතිය : ${getOptionsValue(nations, row.nation)}
    ආගම : ${getOptionsValue(religions, row.religion)}
    කුලය : ${getOptionsValue(castes, row.caste)}
    රැකියාව : ${getOptionsValue(professions, row.job)}
    මාසික ආදායම : ${getOptionsValue(monthlyIncomes, row.salary)}
    දිස්ත්‍රීකය : ${getOptionsValue(districts, row.district)}
    ලිපිනය : ${row.address}
    දුරකථන අංකය : ${row.phone}
    පින්තුර: ${row.profile_image_url}`;

    await copyToClipboard(text)
      .then(() => toastSuccess(`Member ID ${row.id} data copied successfully!`))
      .catch((error) => console.log(error));
    setIsLoading(false);
  };

  const rowDelete = async (id) => {
    setIsLoading(true);
    if (confirm("Are you sure you want to delete?")) {
      await memberDelete(id, setData);
    }
    setIsLoading(false);
  };

  const columns = [
    columnHelper.accessor("profile_image_url", {
      cell: (info) => (
        <div className="object-cover w-10 h-10 rounded-full cursor-pointer hover:animate-pulse">
          <Image
            className={`absolute  ${!avatarLoading ? "hidden" : ""}`}
            src={avatarLoader}
            width={50}
            height={50}
            alt="avatar loading"
          />
          <Image
            alt={""}
            src={info.getValue()}
            width={50}
            height={50}
            onLoad={() => {
              setAvatarLoading(false);
            }}
          />
        </div>
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
    columnHelper.accessor("gender", {
      cell: (info) => <span>{getOptionsValue(gender, info.getValue())}</span>,
      header: "Gender",
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
      cell: (info) => <PhoneNumber info={info} />,
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
    columnHelper.accessor("approvel_status", {
      cell: (info) => (
        <select
          onChange={approvalHandler}
          value={info.getValue()}
          id={info.row.original.id}
          class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
            info.row.original.approvel_status
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
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <FaPencil
              size={25}
              color={
                info.row.original.approvel_status == "true" ||
                info.row.original.approvel_status == true
                  ? "#4ade80"
                  : "white"
              }
              onClick={() => {
                openUpdateMember();
                setCurrentRow(info.row.original);
              }}
            />
          </button>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              rowCopyToClipBoard(info.row.original);
            }}
          >
            Copy
          </button>
          <button
            onClick={() => {
              setIsLoading(true);
              downloadImage(
                info.row.original.profile_image_url,
                info.row.original.full_name
              );
              setIsLoading(false);
            }}
            type="button"
            class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 me-2"
          >
            Download
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
  ];

  const table = useReactTable({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const openUpdateMember = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isMemberUpdatePopup"]: true,
    }));
  };

  const closeUpdateMember = () => {
    setPopups((prevValue) => ({
      ...prevValue,
      ["isMemberUpdatePopup"]: false,
    }));
  };

  return (
    <>
      <MemberUpdatePopup
        setIsLoading={setIsLoading}
        open={popups.isMemberUpdatePopup}
        currentRow={currentRow}
        onClose={closeUpdateMember}
      />

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
                          row.original.approvel_status ? " text-green-400" : ""
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
