"use client";
import Image from "next/image";
import InputSearch from "./component/InputSearch";
import WeatherInfo from "./component/WeatherInfo";
import Container from "./component/Container";
import { Provider } from "react-redux";
import { store } from "./store/weatherStore";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="h-screen rounded-3xl pt-10 ">
        <Container>
          <InputSearch />
          <WeatherInfo />
        </Container>
      </main>
    </Provider>
  );
}
