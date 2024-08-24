import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from '../../app/store'

interface weatherState {
  temperature: number ;
  humidity: number ;
  wind_speed: number ;
  wind_direction: number ;
  rain_intensity: number ;
  rain_accumulation: number;
}

interface weatherinitialState {
  localityWeatherData: weatherState;
  localityName:string
}

const initialState: weatherinitialState = {
  localityWeatherData: {
    temperature: 0,
    humidity: 0,
    wind_speed: 0,
    wind_direction: 0,
    rain_intensity: 0,
    rain_accumulation: 0,
  },
  localityName:"new delhi"
};
export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    weatherInfoData: (state, action: PayloadAction<weatherState>) => {
      state.localityWeatherData = action.payload;
    },
    currlocality: (state, action: PayloadAction<string>) => {
      state.localityName = action.payload;
    },
  },
});

export const { weatherInfoData,currlocality } = weatherSlice.actions;

export default weatherSlice.reducer;
