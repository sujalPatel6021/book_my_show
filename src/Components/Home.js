import React from "react";
import Header1 from "./Header1";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import MoviesCard from "./MoviesCard";
import StreamPhoto from "./StreamPhoto";
import BestLiveEvent from "./BestLiveEvent";
import Premiere from "./Premiere";
import MusicStudio from "./MusicStudio";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header1 />
      <Carousel />
      <MoviesCard />
      <StreamPhoto />
      <BestLiveEvent />
      <Premiere />
      <MusicStudio />
      <Footer />
    </div>
  );
}
