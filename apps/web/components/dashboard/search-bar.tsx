"use client";

import { Search } from "lucide-react";
import { use } from "react";
import { SearchFilesContext } from "@/context/searchFilesContext";

export function SearchBar() {
  const { handleSearchQueryChange } = use(SearchFilesContext);

  return (
    <div className="relative w-1/3 scale-110">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground h-4 w-4" />
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleSearchQueryChange(event)
        }
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary/50 text-foreground border-none focus:outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
