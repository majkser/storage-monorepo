"use client";

import { createContext, useState } from "react";

export interface SearchFilesContextType {
  searchQuery: string;
  handleSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchFilesContext = createContext<SearchFilesContextType>({
  searchQuery: "",
  handleSearchQueryChange: () => {},
});

export default function SearchFilesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchQueryChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setSearchQuery(event.target.value);
    console.log("Search query changed:", event.target.value);
  }

  return (
    <SearchFilesContext.Provider
      value={{ searchQuery, handleSearchQueryChange }}
    >
      {children}
    </SearchFilesContext.Provider>
  );
}
