import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppState } from "../Context/AppState";
import PlanCard from "../Pages/Plans/PlanCard";

function MyPlans() {
  const { BASE_URL, vendorId } = useAppState();
  const [plans, setPlans] = useState([]);

  console.log(vendorId);

  const getPlans = async () => {
    const response = await axios.get(
      `${BASE_URL}/vender/getMyPlans/${vendorId}`
    );
    const { ListOfPlansOffered } = response.data;
    setPlans(ListOfPlansOffered);
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <>
      {plans.map((item, index) => {
        return (
          <PlanCard
            planName={item.planName}
            description={item.description}
            menuImage={item.menuImage}
            planType={item.planType}
            duration={item.duration}
            price={item.price}
            planId={item._id}
            key={index}
          />
        );
      })}
    </>
  );
}

export default MyPlans;
