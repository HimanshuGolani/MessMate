import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import NavBar from "./Pages/NavBar/NavBar";
import Login from "./Pages/Login-signup/Login";
function App() {
  return (
    <>
      <div className="main-div">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
