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
        </Routes>
      </div>
    </>
  );
}

export default App;
