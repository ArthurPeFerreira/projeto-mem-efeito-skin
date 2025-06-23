import ifcLogo from "./../../../../public/IFC.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 p-2 flex justify-between items-center">
      <Image src={ifcLogo} alt="logo" height={80} width={240} />
      <div className="text-white text-lg font-semibold mr-2">
        <div>Arthur Pedro Ferreira</div>
        <div>André Dos Santos Ferreira</div>
      </div>
    </nav>
  );
}
