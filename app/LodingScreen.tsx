import React from "react";
import { CircularProgress } from "@mui/material";

export function LoadingScreen() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full h-[300px] ">
      <CircularProgress size={60} sx={{ color: `rgba(0, 72, 181)` }} />
      <span>Loading...</span>
    </div>
  );
}

export default LoadingScreen;
