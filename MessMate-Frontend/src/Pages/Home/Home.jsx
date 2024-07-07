import React from "react";
import "./Home.css";
import HeroImage from "../../assets/img/hero.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main>
        <div className="home-container">
          <section className="hero-section">
            <div className="hero">
              <div className="hero-text-box">
                <h1 className="heading-primary">
                  Delicious food, delivered fresh.
                </h1>
                <p className="hero-description">
                  Welcome to our platform, where we connect you with local
                  home-cooks who prepare and deliver delicious home-cooked meals
                  at affordable prices. Our goal is to bring you fresh, healthy,
                  and tasty meals right to your doorstep, making your dining
                  experience convenient and enjoyable.
                  <b>
                    {" "}
                    With us, you can keep track of your everyday meals, number
                    of skips, delivery status, and much more.
                  </b>
                  <em>
                    {" "}
                    All with just a few clicks. So what are you waiting for?
                  </em>
                </p>
                <Link to="#" className="btn btn--full margin-right-sm">
                  Start eating homely
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

          <section className="services-section">
            <h2 className="section-heading">Our Services</h2>
            <div className="services-container">
              <div className="service-box">
                <h3>Home-Cooked Meals</h3>
                <p>
                  Enjoy a variety of homemade dishes prepared by talented cooks
                  in your community. Each meal is crafted with love and care,
                  ensuring you receive the best quality food.
                </p>
              </div>
              <div className="service-box">
                <h3>Affordable Prices</h3>
                <p>
                  We believe that good food should be accessible to everyone.
                  Our home-cooked meals are priced affordably to suit every
                  budget.
                </p>
              </div>
              <div className="service-box">
                <h3>Meal Tracking</h3>
                <p>
                  Keep track of your daily meals with our easy-to-use tracking
                  system. Monitor what you eat, manage your diet, and stay on
                  top of your nutritional needs.
                </p>
              </div>
              <div className="service-box">
                <h3>Skip Management</h3>
                <p>
                  Easily manage your meal plans by keeping track of the number
                  of skips. Adjust your orders according to your schedule and
                  preferences.
                </p>
              </div>
              <div className="service-box">
                <h3>Delivery Status</h3>
                <p>
                  Stay informed about the status of your meal deliveries. Know
                  when your food is on its way and get real-time updates to
                  ensure timely arrivals.
                </p>
              </div>
            </div>
          </section>

          <section className="benefits-section">
            <h2 className="section-heading">Benefits</h2>
            <div className="benefits-container">
              <div className="benefit-box">
                <h3>Healthy Eating</h3>
                <p>
                  Home-cooked meals are often healthier than restaurant food.
                  Our cooks use fresh, high-quality ingredients to prepare
                  nutritious dishes that support a balanced diet.
                </p>
              </div>
              <div className="benefit-box">
                <h3>Community Support</h3>
                <p>
                  By choosing our service, you are supporting local home-cooks
                  and contributing to the local economy. Enjoy the warmth and
                  care of homemade food while helping your community thrive.
                </p>
              </div>
              <div className="benefit-box">
                <h3>Convenience</h3>
                <p>
                  With our platform, you can enjoy the convenience of having
                  delicious meals delivered to your home. Save time on cooking
                  and shopping while still enjoying nutritious, home-cooked
                  food.
                </p>
              </div>
            </div>
          </section>

          <section className="how-it-works-section">
            <h2 className="section-heading">How It Works</h2>
            <div className="steps-container">
              <div className="step-box">
                <h3>Browse</h3>
                <p>
                  Explore a wide range of home-cooked meals available in your
                  area.
                </p>
              </div>
              <div className="step-box">
                <h3>Order</h3>
                <p>
                  Select the dishes you want and place your order with just a
                  few clicks.
                </p>
              </div>
              <div className="step-box">
                <h3>Track</h3>
                <p>
                  Keep track of your meals, skips, and delivery status through
                  our user-friendly app.
                </p>
              </div>
              <div className="step-box">
                <h3>Enjoy</h3>
                <p>
                  Receive your freshly prepared meal at your doorstep and savor
                  the delicious flavors of home cooking.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
