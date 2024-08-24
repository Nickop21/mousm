"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Cards({ img, name, percentage }: any) {
  const [text, settext] = useState<string>("");

  useEffect(() => {
    if (name == "Rain Chances") {
      if (percentage?.rain_accumulation >= 1.8) {
        settext("Raining");
      }
      else if (percentage?.rain_accumulation >= 1) {
        settext("High chance of rain");
      } else if (percentage?.rain_accumulation >= 0.5) {
        settext("Moderate chance of rain");
      } else {
        settext("Low chance of rain");
      }
    } else settext(name);
  }, [percentage]);

  return (
    <div className="bg-custom-day-cloudy  rounded-lg p-4 shadow-md shadow-gray-800">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12  md:w-16 md:h-16">

        <Image
          src={`/weather/${img}.png`}
          height={100}
          width={100}
          alt="weather"
         
        />
        </div>

        <div>
          {name == "wind Speed" ? (
            <h4 className="font-extrabold text-white text-xl">
              {Math.floor(percentage * 3.6)} km/h
            </h4>
          ) : (
            name !== "Rain Chances" && (
              <h4 className="font-extrabold text-white text-xl">
                {Math.floor(percentage)}%
              </h4>
            )
          )}
          {name == "Rain Chances" ? (
            <h4 className="font-semibold text-white text-xs"> {text}</h4>
          ) : (
            <h4 className="font-semibold text-white text-xs"> {name}</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;
