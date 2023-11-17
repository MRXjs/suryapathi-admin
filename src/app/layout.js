import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Suryapathi",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="si">
      <body className="">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
