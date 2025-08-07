//implement file context to provide file data to components
"use client";

import { createContext, useState, useEffect, use } from "react";
import { File } from "@/app/types/fileInterface";
import { authContext } from "./authContext";

export interface FileContextType {
  files: File[];
  loading: boolean;
  error: string | null;
  fetchAllFiles: () => Promise<void>;
}

export const fileContext = createContext<FileContextType>({
  files: [],
  loading: true,
  error: null,
  fetchAllFiles: async (): Promise<void> => {},
});

export default function FileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = use(authContext);

  useEffect(() => {
    if (user) {
      fetchAllFiles();
    }
  }, [user]);

  async function fetchAllFiles(): Promise<void> {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/files/userfiles`,
        {
          method: "GET",
          next: {
            revalidate: 60, // Revalidate every 60 seconds
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch files");
      }

      const data = await res.json();
      console.log("Fetched files:", data);
      setFiles(data.files as File[]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to fetch files");
    }
  }

  return (
    <fileContext.Provider value={{ files, loading, error, fetchAllFiles }}>
      {children}
    </fileContext.Provider>
  );
}
