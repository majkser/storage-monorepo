import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import DownloadButton from "@/components/downloads/downloadButton";
import axios from "axios";
import { Music, ImageIcon, Film, MoreHorizontal } from "lucide-react";
import { File } from "@/app/types/fileInterface";

export default async function page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const category = new Map([
    [
      "Music",
      {
        icon: Music,
        color: "bg-red-500/20",
        iconColor: "text-red-500",
      },
    ],
    [
      "Images",
      {
        icon: ImageIcon,
        color: "bg-blue-500/20",
        iconColor: "text-blue-500",
      },
    ],
    [
      "Media",
      {
        icon: Film,
        color: "bg-brand",
        iconColor: "text-white",
      },
    ],
    [
      "Others",
      {
        icon: MoreHorizontal,
        color: "bg-purple-500/20",
        iconColor: "text-purple-500",
      },
    ],
  ]);

  function categoryBasedOnMimeType(mimeType: string): string {
    if (mimeType.startsWith("audio/")) {
      return "Music";
    } else if (mimeType.startsWith("image/")) {
      return "Images";
    } else if (mimeType.startsWith("video/")) {
      return "Media";
    } else {
      return "Others";
    }
  }

  if (token.length !== 36) {
    notFound();
  }

  let fileId: string;
  let file: File;

  //when file on the server will be implemented, change to not get the fileId
  // but treat as middleware on backend and fetch whole file info
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/link/${token}`,
      {
        withCredentials: true,
      }
    );

    if (res.status !== 200) {
      notFound();
    }

    fileId = res.data.fileId;
  } catch (error) {
    console.error("Error fetching file:", error);
    notFound();
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/files/${fileId}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch files");
    }

    file = await res.json();
    console.log("Fetched files:", file);
  } catch (error) {
    console.error("Error fetching files:", error);
    notFound();
  }

  //try to implement promise all ?

  return (
    <BackgroundBeamsWithCollision className="h-screen w-screen">
      <div className="z-20 flex h-screen w-screen flex-col items-center justify-center gap-4">
        <h1 className="h1 text-white text-center">{token}</h1>
        <h1 className="h1 text-white text-center">{fileId}</h1>
        <ScrollArea className="h-3/4 w-3/5 bg-black/75">
          <div className="flex flex-col items-center justify-center gap-4 p-4 text-white">
            <h1 className="h1">Token</h1>
            <ul className="w-full">
              <li>
                <div className="flex w-full justify-between items-center mb-1">
                  <div className="flex items-center gap-4 mb-2">
                    {(() => {
                      const categoryName = categoryBasedOnMimeType(
                        file.mimetype
                      );
                      const Icon = category.get(categoryName)?.icon;
                      return Icon ? (
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center ${
                            category.get(categoryName)?.color
                          } ${category.get(categoryName)?.iconColor}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                      ) : null;
                    })()}
                    <span className="text-2xl text-gray-400">
                      {file.originalName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.size < Math.pow(10, 6) && (
                      <p className="text-sm text-gray-400">
                        {(file.size / Math.pow(10, 3)).toPrecision(4)} kB
                      </p>
                    )}
                    {file.size >= Math.pow(10, 6) &&
                      file.size < Math.pow(10, 8) && (
                        <p className="text-sm text-gray-400">
                          {(file.size / Math.pow(10, 6)).toPrecision(4)} MB
                        </p>
                      )}
                    {file.size >= Math.pow(10, 8) && (
                      <p className="text-sm text-gray-400">
                        {(file.size / Math.pow(10, 9)).toPrecision(4)} GB
                      </p>
                    )}
                    <DownloadButton
                      fileId={file.id}
                      fileName={file.originalName}
                    />
                    {/* Replace 10 with the actual fileId when implemented !!!*/}
                  </div>
                </div>
                <Separator />
              </li>
              <li>
                <p className="text-sm text-gray-400">File name</p>
                <p className="text-sm text-gray-400">File size</p>
                <Separator />
              </li>
            </ul>
          </div>
        </ScrollArea>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

//TODO
// change structure - devide into components
// fetch file/files from server
// improve ui - download button, add icons, add animations
// add progress bar
