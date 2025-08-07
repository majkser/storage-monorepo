"use client";

import { cn } from "@/lib/utils";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { useEffect, useRef, useCallback, useState, use } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import axios from "axios";
import SuccessUpload from "@/components/filesDropZone/successUpload";
import { fileContext } from "@/context/fileContext";

export default function FileDropZone({
  isDropZoneOpen,
  setIsDropZoneOpen,
}: {
  isDropZoneOpen: boolean;
  setIsDropZoneOpen: (isOpen: boolean) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedSuccessfully, setUploadedSuccessfully] = useState(false);
  const { fetchAllFiles } = use(fileContext);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleUpload = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setUploading(true);

    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/files/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (ProgressEvent) => {
            const percentCompleted = Math.round(
              (ProgressEvent.loaded * 100) / (ProgressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setFiles([]);
      setUploadProgress(0);
      setUploadedSuccessfully(true);
      setTimeout(() => {
        setUploadedSuccessfully(false);
      }, 2000);
      fetchAllFiles(); // Refresh the file list after upload
    } catch (error) {
      console.error("Error uploading files:", error);
      setError("Error uploading files. Please try again.");
    } finally {
      setUploading(false);
      setIsDropZoneOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropZoneRef.current &&
        !dropZoneRef.current.contains(event.target as Node) &&
        !uploading
      ) {
        setIsDropZoneOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropZoneOpen, setIsDropZoneOpen, uploading]);

  // setTimeout(() => {
  //   setUploadedSuccessfully(true);
  // }, 5000);

  // setTimeout(() => {
  //   setUploadedSuccessfully(false);
  // }, 8000);

  if (uploadedSuccessfully) {
    return <SuccessUpload />;
  }

  return (
    <div
      className={cn(
        "absolute top-0 left-0 translate-x-1/2 translate-y-1/2 w-1/2 h-1/2",
        !isDropZoneOpen && "hidden"
      )}
    >
      <div
        onClick={() => setIsDropZoneOpen(false)}
        className="z-20 absolute top-0 right-0 mr-5 mt-4 cursor-pointer transition-colors duration-300 hover:text-red-600"
      >
        <IoIosCloseCircle size={40} className="h-1/2" />
      </div>
      <div
        {...getRootProps({
          ref: dropZoneRef,
          className: cn(
            "h-full w-full bg-gray-200 flex flex-col justify-center items-center shadow-transition rounded-4xl overflow-hidden",
            uploading && "pointer-events-none"
          ),
        })}
      >
        <h2 className="h2">File Drop Zone</h2>
        {files.length > 0 && (
          <div className="w-3/4 h-1/2 mx-auto flex flex-col">
            <h4 className="h4 text-center">selected files: </h4>
            <ul className="list-disc list-inside overflow-y-auto h-full pr-5">
              {files.map((file) => (
                <div key={file.name} className="flex justify-between my-1">
                  <li>{file.name}</li>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      setFiles((prevFiles) =>
                        prevFiles.filter(
                          (prevFile) => prevFile.name !== file.name
                        )
                      );
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    <p className="p">remove</p>
                  </Button>
                </div>
              ))}
            </ul>
          </div>
        )}
        {files.length === 0 && <RiUploadCloud2Fill size={175} />}
        <input {...getInputProps()} />
        {files.length === 0 ? (
          isDragActive ? (
            <p className="p mt-10">Drop the files here ...</p>
          ) : (
            <p className="p mt-10">
              Drag and drop some files here, or click to select files
            </p>
          )
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {uploading && (
              <Progress value={uploadProgress} className="w-full h-2" />
            )}

            <Button
              onClick={handleUpload}
              variant="default"
              disabled={uploading || files.length === 0}
              className="w-full"
            >
              {uploading ? `Uploading... ${uploadProgress}%` : "Upload Files"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
