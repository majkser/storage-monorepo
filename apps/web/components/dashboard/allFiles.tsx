'use client';

import { use, useState } from 'react';
import { usePathname } from 'next/navigation';
import GenerateLinkButton from '@/components/generateLinkButton';
import { Music, ImageIcon, Film, MoreHorizontal } from 'lucide-react';
import DownloadButton from '@/components/downloads/downloadButton';
import { File } from '@/app/types/fileInterface';
import { fileContext } from '@/context/fileContext';
import { SearchFilesContext } from '@/context/searchFilesContext';
import { Button } from '../ui/button';
import { ChevronsRight, ChevronsLeft } from 'lucide-react';
import { AllFilesCheckbox } from './file-access/allFilesCheckbox';

export default function AllFiles({
  sort,
  filter,
  sortingOrderDesc,
}: {
  sort: string;
  filter: string;
  sortingOrderDesc: boolean;
}) {
  const { files, loading, error } = use(fileContext);
  const { searchQuery } = use(SearchFilesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pathname = usePathname();

  let filteredFiles = files.filter(
    (file: File) =>
      !filter ||
      filter === 'All' ||
      categoryBasedOnMimeType(file.mimetype) === filter
  );

  filteredFiles = filteredFiles.filter((file: File) =>
    file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) =>
    chooseSortFunction(a, b)
  );

  const currentFiles = sortedFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage * itemsPerPage < filteredFiles.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function chooseSortFunction(a: File, b: File) {
    switch (sort) {
      case 'alphabetically':
        return sortingOrderDesc
          ? sortAlphabetically(a, b)
          : sortAlphabetically(b, a);
      case 'size':
        return sortingOrderDesc ? sortBySize(a, b) : sortBySize(b, a);
      default:
        return sortingOrderDesc
          ? sortByUploadDate(a, b)
          : sortByUploadDate(b, a);
    }
  }

  function sortAlphabetically(a: File, b: File) {
    return a.originalName.localeCompare(b.originalName);
  }

  function sortByUploadDate(a: File, b: File) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  function sortBySize(a: File, b: File) {
    return b.size - a.size;
  }

  const category = new Map([
    [
      'Music',
      {
        icon: Music,
        color: 'bg-red-500/20',
        iconColor: 'text-red-500',
      },
    ],
    [
      'Images',
      {
        icon: ImageIcon,
        color: 'bg-blue-500/20',
        iconColor: 'text-blue-500',
      },
    ],
    [
      'Media',
      {
        icon: Film,
        color: 'bg-brand',
        iconColor: 'text-white',
      },
    ],
    [
      'Others',
      {
        icon: MoreHorizontal,
        color: 'bg-purple-500/20',
        iconColor: 'text-purple-500',
      },
    ],
  ]);

  function categoryBasedOnMimeType(mimeType: string): string {
    if (mimeType.startsWith('audio/')) {
      return 'Music';
    } else if (mimeType.startsWith('image/')) {
      return 'Images';
    } else if (mimeType.startsWith('video/')) {
      return 'Media';
    } else {
      return 'Others';
    }
  }

  return (
    <div className="w-4/5 md:w-3/4 flex flex-col mx-auto gap-4">
      {currentFiles.length > 0 &&
        currentFiles.map((file) => (
          <div
            key={file.id}
            className="bg-secondary/20 hover:bg-secondary/25 p-4 rounded-lg flex justify-between items-center md:flex-row flex-col"
          >
            <div className="flex items-center justify-start gap-4">
              {(() => {
                const categoryName = categoryBasedOnMimeType(file.mimetype);
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
              <div>
                <h2 className="text-white text-2xl">{file.originalName}</h2>
                <p className="text-gray-400">
                  Uploaded on:{' '}
                  {new Date(file.createdAt).toLocaleDateString('pl-PL')}
                </p>
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
              </div>
            </div>
            <div className="flex items-center flex-row md:flex-col gap-2 mt-2">
              {!pathname.includes('dashboard/') && (
                <>
                  <GenerateLinkButton fileId={file.id} />
                  <DownloadButton
                    fileId={file.id}
                    fileName={file.originalName}
                    label="Download"
                  />
                </>
              )}
              {pathname.includes('file-access') && <AllFilesCheckbox />}
            </div>
          </div>
        ))}
      {currentFiles.length === 0 && (
        <h4 className="h2 text-white text-center mt-8">
          No {filter.toLowerCase()} found
        </h4>
      )}

      {currentFiles.length > 0 && (
        <div className="flex justify-center items-center justify-items-center gap-4 mt-4">
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            variant={'link'}
            className="text-white"
          >
            <ChevronsLeft className="scale-200" />
          </Button>
          <span className="text-white span">
            Page {currentPage} of{' '}
            {Math.ceil(filteredFiles.length / itemsPerPage)}
          </span>
          <Button
            onClick={nextPage}
            disabled={currentPage * itemsPerPage >= filteredFiles.length}
            variant={'link'}
            className="text-white"
          >
            <ChevronsRight className="scale-200" />
          </Button>
        </div>
      )}
    </div>
  );
}
