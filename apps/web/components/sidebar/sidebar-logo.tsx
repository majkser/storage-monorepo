import Image from "next/image"

export function SidebarLogo() {
  return (
    <div className="p-4 flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-brand flex items-center justify-center">
        <Image src="/mxr-white.png" alt="MXR Logo" width={24} height={24} />
      </div>
      <h1 className="h5 text-white">Storage</h1>
    </div>
  )
}