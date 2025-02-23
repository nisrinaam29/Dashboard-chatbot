import { TimerContext } from "@/contexts/TimerContext";
import React, { useContext, useEffect } from "react";

const Timer = () => {
  const { hours, minutes, seconds } = useContext(TimerContext);
  useEffect(() => {}, [seconds]);

  return (
    <div className="btn bg-[#EE7D13] text-white py-2 px-4">
      <div>{hours.toString().padStart(2, "0")}</div>
      <div>:</div>
      <div>{minutes.toString().padStart(2, "0")}</div>
      <div>:</div>
      <div>{seconds.toString().padStart(2, "0")}</div>
    </div>
  );
};

export default Timer;
