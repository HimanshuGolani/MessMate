import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlanCard from "./PlanCard";

export default function PlanContainer() {
  const { state } = useLocation();
  const { ListOfPlansOffered } = state;

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setPlans(ListOfPlansOffered);
  }, [ListOfPlansOffered]);

  console.log("The plan is : ");
  console.log(plans);
  console.log("====================================");

  return (
    <>
      {plans.length > 0 ? (
        plans.map((item, index) => (
          <PlanCard
            planName={item.planName}
            description={item.description}
            menuImage={item.menuImage}
            planType={item.planType}
            price={item.price}
            duration={item.duration}
            offeredBy={item.offeredBy}
            planId={item._id}
            key={index}
          />
        ))
      ) : (
        <>No plans added yet.</>
      )}
    </>
  );
}
