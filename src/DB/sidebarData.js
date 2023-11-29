import { MdManageAccounts } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { FaSun } from "react-icons/fa";
import { LuBaby } from "react-icons/lu";
import { BsFillEnvelopePaperHeartFill } from "react-icons/Bs";
import { RiGalleryFill } from "react-icons/ri";

export const Menus = [
  { title: "Member Management", icon: <MdManageAccounts />, url: "/" },
  {
    title: "Proposal Request",
    icon: <BsFillEnvelopePaperHeartFill />,
    url: "/proposalreq/",
  },
  { title: "Astrology Requests", icon: <FaSun />, url: "/astrologyreq/" },
  { title: "Baby Name Requests", icon: <LuBaby />, url: "/babynamereq/" },
  { title: "Video Gallery", icon: <RiGalleryFill />, url: "/video-gallery/" },
  { title: "Log Out", icon: <BiLogOutCircle />, url: "/auth/" },
];
