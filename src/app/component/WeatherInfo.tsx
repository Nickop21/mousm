"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { useSelector } from "react-redux";
import { RootState } from "../store/weatherStore";

function WeatherInfo() {
  const [weatherImg, setWeatherImg] = useState<string>("/weather/day/humid");
  const [tempImg, setTempImg] = useState<string>("/weather/temperature-cold");
  const [time, settime] = useState("night");

  const mousmData = useSelector(
    (state: RootState) => state.weather.localityWeatherData
  );
  const currlocality = useSelector(
    (state: RootState) => state.weather.localityName
  );
  const isDaytime = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 6 && hours < 18;
  };

  useEffect(() => {
    settime(isDaytime() ? "day" : "night");
    const isDay = time === "day";
    const isNight = time === "night";

    if (
      mousmData?.temperature !== undefined &&
      mousmData?.humidity !== undefined
    ) {
      if (isDay) {
        if (mousmData.temperature > 40) {
          setWeatherImg(
            mousmData.humidity > 50 ? "/weather/day/humid" : "/weather/day/day"
          );
          setTempImg("/weather/temperature-hot");
        } else if (mousmData.temperature >= 20) {
          setWeatherImg("/weather/day/normal");
          setTempImg("/weather/temperature-normal");
        } else {
          setWeatherImg("/weather/day/day-cold");
          setTempImg("/weather/temperature-cold");
        }
      } else if (isNight) {
        if (mousmData.temperature > 15) {
          setWeatherImg(
            mousmData.humidity > 50
              ? "/weather/night/humid"
              : "/weather/night/night"
          );
        } else {
          setWeatherImg("/weather/night/night-cold");
        }
      }
    }
    if (mousmData.temperature >= 40) {
      setTempImg("/weather/temperature-hot");
    } else if (mousmData.temperature >= 20) {
      setTempImg("/weather/temperature-normal");
    } else {
      setTempImg("/weather/temperature-cold");
    }
  }, [mousmData]);

  function floorval(params: number) {
    return Math.floor(params);
  }

  if (mousmData.temperature == null || mousmData.temperature == 0) {
    const message =
      mousmData.temperature == null
        ? "No Data Available. Try a different locality."
        : "Search Weather to see the details";

    return (
      <h1 className="font-extrabold text-teal-50 text-2xl text-center mt-48">
        {message}
      </h1>
    );
  }

  return (
    <div className="flex items-center flex-col gap-5  rounded-lg p-1  mt-20">
      <div className="flex items-center gap-5">
        <Image
          src={`${weatherImg}.png`}
          height={150}
          width={150}
          alt="weather"
        />

        <Image src={`${tempImg}.png`} height={100} width={100} alt="weather" />

        <h1 className="font-extrabold text-teal-50 text-2xl md:text-5xl">
          {floorval(mousmData?.temperature) + "°c" || "no data"}
        </h1>
      </div>
      <h1 className="font-extrabold text-teal-50 text-sm">
        {mousmData.temperature !== 0 && currlocality}
      </h1>

      <div className="flex gap-5">
        <Cards
          img="humidity"
          name={"Humidity"}
          percentage={mousmData?.humidity}
        />
        <Cards
          img="wind"
          name={"wind Speed"}
          percentage={mousmData?.wind_speed}
        />
      </div>

      <Cards img="heavy-rain" name={"Rain Chances"} percentage={mousmData} />
    </div>
  );
}

export default WeatherInfo;
