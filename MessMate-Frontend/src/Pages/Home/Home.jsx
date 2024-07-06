import React from "react";
import "./Home.css";
import mainLogo from "../../assets/mainLogo.svg";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <section className="one">
          <img src={mainLogo} alt="Main Logo" className="main-image" />
        </section>
        <section className="two">
          <div className="block">Section 2</div>
        </section>
        <section className="three">
          <div className="block">Section 3</div>
        </section>
        <section className="four">
          <div className="block">Section 4</div>
        </section>
      </div>
    </>
  );
};

export default Home;
