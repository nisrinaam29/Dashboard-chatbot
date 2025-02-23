import React from "react";

const Loading = () => {
  return (
    <div className="z-50 absolute bg-slate-700 w-full h-full bg-opacity-20">
      <div className="flex items-center justify-center h-full text-primary">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
