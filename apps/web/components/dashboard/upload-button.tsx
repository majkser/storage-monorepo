"use client";

import { authContext } from "@/context/authContext";
import { useContext } from "react";
import DropZoneTriggerButton from "@/components/filesDropZone/dropZoneTriggerButton";

export function UploadButton() {
  const { user } = useContext(authContext);

  if (!user) return null;
  return (
    <div className="flex items-center space-x-4">
      {user.isAdmin && <DropZoneTriggerButton />}
    </div>
  );
}
