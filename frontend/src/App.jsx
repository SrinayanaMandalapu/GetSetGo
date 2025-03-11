import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from "./features/itinerary/pages/HomePage";
import ItineraryPage from "./features/itinerary/pages/ItineraryPage";
import SmartPackingList from "./features/packing_list/SmartPackingList";
import Header from "./components/Header";
import WelcomePage from "./components/WelcomePage";
import HomePage2 from "./components/HomePage2";
import "./index.css";

export default function App() {
  return (    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/home" element = {<HomePage/>} />
        <Route path = "/home2" element = {<HomePage2/>} />
        <Route path="/trip-planner/:city/:days_cnt" element={<ItineraryPage />} />
        <Route path = "/SmartPackingList" element = {<SmartPackingList/>} />
      </Routes>
    </Router>
  );
}