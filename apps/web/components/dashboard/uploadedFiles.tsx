"use client";

import SortAndFilter from "@/components/dashboard/sortAndFilter";
import { useState } from "react";
import AllFiles from "./allFiles";
import { SearchBar } from "./search-bar";

export default function UploadedFiles() {
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [sortingOrderDesc, setSortingOrder] = useState(true);

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleSortingOrderChange = () => {
    setSortingOrder((prev) => !prev);
    console.log("Sorting order changed:", sortingOrderDesc);
  };

  return (
    <div className="w-full min-w-[350px]">
      <div className="ml-4 md:ml-12 mb-8  flex justify-between items-center max-w-[1400px] min-w-[300px]">
        <SearchBar />
        <SortAndFilter
          handleSortChange={handleSortChange}
          handleSortingOrderChange={handleSortingOrderChange}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <AllFiles
        sort={sort}
        filter={filter}
        sortingOrderDesc={sortingOrderDesc}
      />
    </div>
  );
}
