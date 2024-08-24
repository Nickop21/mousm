import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/weatherStore";

function Container({ children }: any) {
  const [bg, setBg] = useState<string>("");
  const [time, settime] = useState("night");
  const mousmData = useSelector(
    (state: RootState) => state.weather.localityWeatherData
  );

  const isDaytime = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 6 && hours < 18;
  };

  useEffect(() => {
    settime(isDaytime() ? "day" : "night");
    if (time === "day") {
      if (mousmData?.humidity > 50) {
        setBg("bg-custom-day-cloudy");
      } else {
        setBg("bg-custom-day-clear");
      }
    } else if (time == "night") {
      if (mousmData?.humidity > 50) {
        setBg("bg-custom-night-cloudy");
      } else {
        setBg("bg-custom-night-clear");
      }
    }
  }, [mousmData]);

  return (
    <div
      className={`max-w-4xl mx-auto box-border p-3 py-10 md:mt-10  ${bg}  rounded-3xl `}
    >
      {children}
    </div>
  );
}

export default Container;
