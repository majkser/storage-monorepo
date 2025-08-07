import mxrLogo from "@/public/mxr.png";
import pokojLogo from "@/public/pokoj.png";
import Image from "next/image";

export default function MobileLoginSidebar() {
  return (
    <div className="bg-brand w-full sm:hidden overflow-hidden">
      <div className="flex justify-evenly items-center">
        <Image
          priority
          src={mxrLogo}
          alt="MXR Logo"
          width={125}
          height={125}
          className="mx-auto xl:m-0"
        />
        <Image
          priority
          src={pokojLogo}
          alt="pokój 126 logo"
          width={125}
          height={125}
          className="mx-auto xl:m-0"
        />
      </div>
      <div className="text-white text-center -mt-4 pb-4">
        <h2 className="h3">MXR and pokój 126</h2>
        <h3 className="h4 -mt-4">Official Storage</h3>
        {/* <p className="body-samll">
          Tutaj znajdziesz gotowe teledyski, nagrania studyjne, zmixowane
          utwory. Ściągnij pliki na dowolnym urządzeniu i udostępnij je
          zespołowi.
        </p> */}
      </div>
    </div>
  );
}
