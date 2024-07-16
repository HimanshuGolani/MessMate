import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NavBar from "./Pages/NavBar/NavBar";
import Login from "./Pages/Login-signup/Login";
import { useAppState } from "./Context/AppState";
import Signup from "./Pages/Login-signup/Signup";
import AllVenders from "./Pages/Venders/AllVenders";
import PlanContainer from "./Pages/Plans/PlanContainer";
import PlansDetails from "./Pages/Plans/PlansDetails";
import PlanCard from "./Pages/Plans/PlanCard";
import AddPlanForm from "./vendor-pages/AddPlanForm";
import MyPlans from "./vendor-pages/MyPlans";
import MyCustomersList from "./vendor-pages/MyCustomersList";

function App() {
  return (
    <>
      <div className="main-div">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AllVendors" element={<AllVenders />} />
          <Route path="/plansOffered" element={<PlanContainer />} />
          <Route path="/plan" element={<PlanCard />} />
          <Route path="/plansDetails/:id" element={<PlansDetails />} />
          <Route path="/vender/addPlan" element={<AddPlanForm />} />
          <Route path="/vender/myPlans" element={<MyPlans />} />
          <Route path="/vender/myCustomersList" element={<MyCustomersList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
