"use client";

import { Button } from "@/components/ui/button";

export default function DownloadButton({
  fileId,
  fileName,
  label = "Download File",
}: {
  fileId: string;
  fileName: string;
  label?: string;
}) {
  async function downloadFile(fileId: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/files/${fileId}/download`
      );

      if (!response.ok) {
        console.error("Failed to download file");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}`;

      document.body.appendChild(a);
      a.click();
    } catch (error) {
      console.error("Error downloading file:", error);
      <div className="bg-red-500">download Error</div>;
    }
  }
  return (
    <Button
      variant="link"
      className="text-brand"
      onClick={() => downloadFile(fileId)}
    >
      {label}
    </Button>
  );
}
