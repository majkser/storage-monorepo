import mxrLogo from "@/public/mxr.png";
import pokojLogo from "@/public/pokoj.png";
import Image from "next/image";

export default function LoginSidebar() {
  return (
    <div className="bg-brand w-full h-screen xl:rounded-r-full xl:scale-150 overflow-hidden">
      <div className="m-auto ml-8 xl:flex xl:justify-center xl:items-center xl:mt-40">
        <Image
          priority
          src={mxrLogo}
          alt="MXR Logo"
          width={175}
          height={175}
          className="mx-auto xl:m-0"
        />
        <Image
          priority
          src={pokojLogo}
          alt="pokój 126 logo"
          width={175}
          height={175}
          className="-mt-16 mx-auto xl:m-0"
        />
      </div>
      <div className="text-white text-left p-6 xl:max-w-3/5 m-auto lg:-mt-8">
        <h3 className="h3">MXR and pokój 126</h3>
        <h4 className="h4 -mt-4">Official Storage</h4>
        <p className="body xl:body-small">
          Tutaj znajdziesz gotowe teledyski, nagrania studyjne, zmixowane
          utwory. Ściągnij pliki na dowolnym urządzeniu i udostępnij je
          zespołowi.
        </p>
      </div>
    </div>
  );
}
