"use client";

import axios from "axios";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useState } from "react";
import { Copy } from "lucide-react";

export default function GenerateLinkButton({ fileId }: { fileId: string }) {
  const [token, setToken] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyButtonClick() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_DOWNLOAD_URL}/${token}`
    );
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  async function generateLink(fileId: string) {
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/link/generate-link`,
          { fileId: fileId },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setToken(response.data.token);
        });
    } catch (error) {
      console.error("Error generating link:", error);
    }
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger
          className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 cursor-pointer"
          onClick={() => generateLink(fileId)}
        >
          Generate Link
        </PopoverTrigger>
        <PopoverContent>
          <p>Link: {`${process.env.NEXT_PUBLIC_DOWNLOAD_URL}/${token}`}</p>
          <div className="flex justify-start items-center">
            <Copy
              size="25"
              className="mt-2 p-1 scale-125 rounded-sm hover:bg-gray-200 cursor-pointer"
              onClick={handleCopyButtonClick}
            />
            {isCopied && (
              <p className="z-20 bg-gray-200 rounded-sm p-1 ml-2 mt-2 caption overflow-hidden">
                copied to clipboard
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
