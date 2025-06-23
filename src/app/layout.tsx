import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "Calculadora Efeito Skin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className="h-screen w-screen bg-gray-900"
      >
        <Navbar/>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
