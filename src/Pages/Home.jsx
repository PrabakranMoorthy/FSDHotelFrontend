import React from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Featured from "../Components/Featured";
import PropertyList from "../Components/PropertyList";
import FeaturedProperties from "../Components/FeaturedProperties";
import MailList from "../Components/MailList";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="mt-12 flex flex-col items-center gap-7">
        <Featured />
        <h1 className="w-[1024px] text-lg">Browse by property type</h1>
        <PropertyList />
        <h1 className="w-[1024px] text-lg">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
