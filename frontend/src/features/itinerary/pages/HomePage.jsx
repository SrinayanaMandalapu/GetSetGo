import { useState } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const navigate = useNavigate();
  
  return (
      <div className="p-6 center font">
        <h2 className="text-lg font-semibold">Enter the city you want to visit:</h2>
        <input
          type="text"
          value={city}
          onChange={(e) => {setCity(e.target.value); console.log(e.target.value)}}
          className="border p-2 my-2"
        />

        <h2 className="text-lg font-semibold">Enter the number of days:</h2>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="border p-2 my-2"
          min = "1"
        />

        <Button onClick={() => navigate(`/trip-planner/${city}/${days}`)}>Plan my trip</Button>
      </div>
  );
}
