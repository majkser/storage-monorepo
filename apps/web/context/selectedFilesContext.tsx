import { createContext, useState } from 'react';
import { File } from '@/app/types/fileInterface';

interface SelectedFilesContextType {
  selectedFiles: File[];
  toggleFileSelection: (file: File) => void;
  clearSelectedFiles: () => void;
  isFileSelected: (file: File) => boolean;
}

export const SelectedFilesContext = createContext<SelectedFilesContextType>({
  selectedFiles: [],
  toggleFileSelection: () => {},
  clearSelectedFiles: () => {},
  isFileSelected: () => false,
});

export function SelectedFilesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function toggleFileSelection(file: File): void {
    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(file)) {
        return prevSelectedFiles.filter((f) => f !== file);
      } else {
        return [...prevSelectedFiles, file];
      }
    });
  }

  function clearSelectedFiles(): void {
    setSelectedFiles([]);
  }

  function isFileSelected(file: File): boolean {
    return selectedFiles.includes(file);
  }

  return (
    <SelectedFilesContext.Provider
      value={{
        selectedFiles,
        toggleFileSelection,
        clearSelectedFiles,
        isFileSelected,
      }}
    >
      {children}
    </SelectedFilesContext.Provider>
  );
}
