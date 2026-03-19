"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoadingDone: boolean;
  setLoadingDone: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoadingDone: false,
  setLoadingDone: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoadingDone, setIsLoadingDone] = useState(false);

  const setLoadingDone = () => setIsLoadingDone(true);

  return (
    <LoadingContext.Provider value={{ isLoadingDone, setLoadingDone }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
