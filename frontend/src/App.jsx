import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/itinerary/pages/HomePage";
import ItineraryPage from "./features/itinerary/pages/ItineraryPage";
import SmartPackingList from "./features/packing_list/SmartPackingList";
import Header from "./components/Header";
//import "./styles.css";
import "./index.css"

export default function App() {
  return (    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trip-planner/:city/:days_cnt" element={<ItineraryPage />} />
        <Route path = "/SmartPackingList" element = {<SmartPackingList/>} />
      </Routes>
    </Router>
  );
}
