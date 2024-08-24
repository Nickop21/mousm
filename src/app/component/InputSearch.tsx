"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import location from "@/app/data/location.json";
import useFetch from "../hooks/useFetch";
import { weatherInfoData ,currlocality } from "../store/weatherSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store/weatherStore";
import Image from "next/image";

// TypeScript type definitions


type Locality = {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
};

function InputSearch() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Locality[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);


  const {weatherData, loading, error, fetchWeatherData } = useFetch();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (weatherData) {
      dispatch(weatherInfoData(weatherData));
      dispatch(currlocality(inputValue));
    }

  }, [weatherData, dispatch]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setIsOpen(false);
      setSuggestions([]);
    } else {
      setIsOpen(true);
    }
  }, [inputValue]);

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const currInput = event.target.value;
    const filteredItems = location.filter(
      (item: Locality) =>
        item.localityName.toLowerCase().includes(currInput.toLowerCase()) ||
        item.cityName.toLowerCase().includes(currInput.toLowerCase())
    );

    setSuggestions(filteredItems);
    setInputValue(currInput);
  }

  async function onLocationSelect(item: Locality) {
    setInputValue(item.localityName);

    fetchWeatherData(item.localityId);

    setIsOpen(false);
    setSuggestions([]);
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div className="">
      <div
        className={` relative w-full outline-none rounded-3xl px-4 py-3 md:w-1/2 mx-auto text-white ${
          isOpen &&suggestions.length > 0
            ? "border-transparent bg-[#444746] rounded-b-none"
            : "border-[1px] border-[#9aa0a6] bg-transparent hover:bg-[#424345] hover:border-transparent hover:shadow-md shadow-[#28292a]"
        }`}
      >
        <div className="flex gap-2">
          <img src="/search.svg" alt="search" height={20} width={20} />
          <input
            className="outline-none bg-transparent w-[100%]"
            autoFocus
            type="text"
            value={inputValue}
            onChange={onInputChange}
            onBlur={handleBlur}
          />
          {inputValue!="" && <Image src={"/cross.svg"} height={20} width={20} alt="close" onClick={()=>setInputValue("")}/>}
          
      
        </div>
        
        {isOpen && suggestions.length > 0 && (
          <>
          <ul className=" max-h-60 overflow-y-scroll border-t-2 absolute bg-[#444746] rounded-3xl rounded-t-none rounded-e-none left-0 right-0 mt-3 p-2 webkit">
            {suggestions.map((item) => (
              <li
                key={item.localityId}
                className="flex gap-3 p-2 cursor-pointer text-white hover:bg-[#6d6e6f]"
                onClick={() => onLocationSelect(item)}
              >
                <img src="/search.svg" alt="search" height={20} width={20} />
                {item.localityName}
              </li>
            ))}
          </ul>
          </>
        )}
      </div>
      {error &&  <>
      
      <h1 className="font-extrabold text-teal-50 text-2xl text-center mt-10">
        {error} try again
      </h1>
      </>}
     
    
  
    </div>
  );
}

export default InputSearch;
