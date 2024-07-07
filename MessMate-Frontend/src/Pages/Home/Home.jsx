import React from "react";
import "./Home.css";
import HeroImage from "../../assets/img/hero.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="home-container">
        <section className="hero-section">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">
                Delicious food, delivered fresh.
              </h1>
              <p className="hero-description">
                We offer home-cooks uin your area that provide home-cooked food
                delicious at afforable prices.
                <b>
                  With us you can keep track of your everyday meal , no. of
                  skips , deliery status and much more.
                </b>
                <em>
                  With in a very few clicks. so what are you waiting for ??
                </em>
              </p>

              <Link to="#" className="btn btn--full margin-right-sm">
                Start eating homely.
              </Link>
              <Link to="#" className="btn btn--outline">
                Learn more &darr;
              </Link>
            </div>
            <div className="hero-image-box">
              <img
                src={HeroImage}
                alt="people enjoying food"
                className="hero-image"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
