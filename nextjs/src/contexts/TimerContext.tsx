"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";

const TimerContext = createContext({
  hours: 0,
  minutes: 0,
  seconds: 0,
  setHours: (e: number) => {},
  setSeconds: (e: number) => {},
  setMinutes: (e: number) => {},
});

const TimerProvider = ({ children }: any) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  
  const [seconds, setSeconds] = useState<number>(Number(localStorage.getItem('seconds')))

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          if (minutes === 0 && hours === 0) {
            clearInterval(interval)

            return 0
          }

          setMinutes(prevMinutes => {
            if (prevMinutes === 0) {
              setHours(prevHours => prevHours - 1)

              return 59
            }

            return prevMinutes - 1
          })

          return 59
        }

        return prevSeconds - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [hours, minutes, seconds])


  useEffect(() => {
    localStorage.setItem("hours", hours.toString());
    localStorage.setItem("minutes", minutes.toString());
    localStorage.setItem("seconds", seconds.toString());
  }, [hours, minutes, seconds]);

  return (
    <TimerContext.Provider
      value={{ hours, minutes, seconds, setHours, setMinutes, setSeconds }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
