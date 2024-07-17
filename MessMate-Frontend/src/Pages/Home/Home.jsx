import React, { useEffect, useState } from "react";
import "./Home.css";
import HeroImage from "../../assets/img/hero.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useAppState } from "../../Context/AppState";

const Home = () => {
  const [userCount, setUserCount] = useState(0);

  const { BASE_URL } = useAppState();

  const getCustomerCount = async () => {
    const response = await axios.get(`${BASE_URL}/user/getCustomerCount`);

    setUserCount(response.data.noOfUsers);
  };

  useEffect(() => {
    getCustomerCount();
  }, []);

  const services = [
    {
      title: "Home-Cooked Meals",
      description:
        "Enjoy a variety of homemade dishes prepared by talented cooks in your community. Each meal is crafted with love and care, ensuring you receive the best quality food.",
    },
    {
      title: "Affordable Prices",
      description:
        "We believe that good food should be accessible to everyone. Our home-cooked meals are priced affordably to suit every budget.",
    },
    {
      title: "Meal Tracking",
      description:
        "Keep track of your daily meals with our easy-to-use tracking system. Monitor what you eat, manage your diet, and stay on top of your nutritional needs.",
    },
    {
      title: "Skip Management",
      description:
        "Easily manage your meal plans by keeping track of the number of skips. Adjust your orders according to your schedule and preferences.",
    },
    {
      title: "Delivery Status",
      description:
        "Stay informed about the status of your meal deliveries. Know when your food is on its way and get real-time updates to ensure timely arrivals.",
    },
  ];

  const benefits = [
    {
      title: "Healthy Eating",
      description:
        "Home-cooked meals are often healthier than restaurant food. Our cooks use fresh, high-quality ingredients to prepare nutritious dishes that support a balanced diet.",
    },
    {
      title: "Community Support",
      description:
        "By choosing our service, you are supporting local home-cooks and contributing to the local economy. Enjoy the warmth and care of homemade food while helping your community thrive.",
    },
    {
      title: "Convenience",
      description:
        "With our platform, you can enjoy the convenience of having delicious meals delivered to your home. Save time on cooking and shopping while still enjoying nutritious, home-cooked food.",
    },
  ];

  const steps = [
    {
      title: "Browse",
      description:
        "Explore a wide range of home-cooked meals available in your area.",
    },
    {
      title: "Order",
      description:
        "Select the dishes you want and place your order with just a few clicks.",
    },
    {
      title: "Track",
      description:
        "Keep track of your meals, skips, and delivery status through our user-friendly app.",
    },
    {
      title: "Enjoy",
      description:
        "Receive your freshly prepared meal at your doorstep and savor the delicious flavors of home cooking.",
    },
  ];

  return (
    <main>
      <div className="home-container">
        <section className="hero-section">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="animated heading-primary">
                Delicious food, delivered fresh.
              </h1>
              <p className="animated hero-description">
                Welcome to our platform, where we connect you with local
                home-cooks who prepare and deliver delicious home-cooked meals
                at affordable prices. Our goal is to bring you fresh, healthy,
                and tasty meals right to your doorstep, making your dining
                experience convenient and enjoyable.
                <b>
                  {" "}
                  With us, you can keep track of your everyday meals, number of
                  skips, delivery status, and much more.
                </b>
                <em>
                  {" "}
                  All with just a few clicks. So what are you waiting for?
                </em>
              </p>
              <Link
                to="/AllVendors"
                className="btn btn--full margin-right-sm"
                aria-label="Start eating homely"
              >
                Start eating homely
              </Link>
              <Link className="btn btn--outline" aria-label="Learn more ">
                {`With the ${userCount} customers, All around.`}
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
            {services.map((service, index) => (
              <article key={index} className="service-box">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="benefits-section">
          <h2 className="section-heading">Benefits</h2>
          <div className="benefits-container">
            {benefits.map((benefit, index) => (
              <article key={index} className="benefit-box">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="how-it-works-section">
          <h2 className="section-heading">How It Works</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <article key={index} className="step-box">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
