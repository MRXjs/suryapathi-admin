"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconContext } from "react-icons";
import controler from "../../../public/control.png";
import logo from "../../../public/logo.png";
import { MdManageAccounts } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { FaSun } from "react-icons/fa";
import { LuBaby } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SideBar = ({ tableWFull }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentMenuIndex, setCurrentMenuIndex] = useState(1);
  const Menus = [
    { title: "Member Management", icon: <MdManageAccounts />, url: "/" },
    { title: "Astrology Requests", icon: <FaSun />, url: "/astrologyreq" },
    { title: "Baby Name Requests", icon: <LuBaby />, url: "/babynamereq" },
    { title: "Log Out", icon: <BiLogOutCircle />, url: "/auth" },
  ];

  const sideBarController = () => {
    setSideBarOpen(!sideBarOpen);
  };

  useEffect(() => {
    tableWFull(sideBarOpen);
  }, [sideBarOpen]);

  const menusHandler = (url) => {
    router.push(url);
  };

  return (
    <div
      className={`fixed min-h-screen z-10 top-0 bottom-0 ${
        sideBarOpen ? "w-72" : "w-20"
      }  bg-dark-purple duration-300 p-5 pt-8`}
    >
      <Image
        src={controler}
        alt="side bar controler"
        width={"1.75rem"}
        height={"1.75rem"}
        className={`absolute border-2 rounded-full cursor-pointer -right-3 top-9 w-7 border-dark-purple ${
          !sideBarOpen && "rotate-180"
        }`}
        onClick={sideBarController}
      />
      <div className="flex items-center gap-x-4 ">
        <Image
          src={logo}
          alt="logo"
          className={`cursor-pointer duration-500 ${
            sideBarOpen && "rotate-[360deg]"
          } `}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !sideBarOpen && "scale-0"
          }`}
        >
          SURYAPATHI
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <div key={index}>
            <li
              className={`flex items-center p-2 text-sm text-gray-300 rounded-md cursor-pointer gap-x-4 hover:bg-light-white ${
                menu.gap ? "mt-9" : "mt-2"
              } ${menu.url === pathName && "bg-light-white"} `}
              onClick={() => menusHandler(menu.url)}
            >
              {/* {menu.title} */}
              <IconContext.Provider value={{ size: "25" }}>
                <div>{menu.icon}</div>
              </IconContext.Provider>
              <span
                className={`${
                  !sideBarOpen && "hidden"
                } origin-left duration-200`}
              >
                {menu.title}
              </span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
