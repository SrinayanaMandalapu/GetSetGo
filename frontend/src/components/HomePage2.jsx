import React, { useState } from "react";
import "./HomePage2.css";

const itineraries = [
  // India
  {
    id: 1,
    name: "Hyderabad - 4 Days",
    category: "India",
    duration: "4 Days",
    image: "hyderabad.jpg",
    details: [
      { day: "Day 1", activities: "Charminar, Golkonda Fort" },
      { day: "Day 2", activities: "Hussain Sagar Lake, Tank Bund" },
      { day: "Day 3", activities: "Salar Jung Museum, Chowmahalla Palace" },
      { day: "Day 4", activities: "Ramoji Film City" },
    ],
    hotels: ["Taj Krishna", "The Park Hyderabad"],
    food: ["Paradise Biryani", "Chutneys", "Shah Ghouse"],
  },
  {
    id: 2,
    name: "Goa - 4 Days",
    category: "India",
    duration: "4 Days",
    image: "goa.jpg",
    details: [
      { day: "Day 1", activities: "Calangute Beach, Baga Beach" },
      { day: "Day 2", activities: "Dudhsagar Falls, Spice Plantation" },
      { day: "Day 3", activities: "Aguada Fort, Old Goa Churches" },
      { day: "Day 4", activities: "Sunset Cruise on Mandovi River" },
    ],
    hotels: ["Le Meridien Goa", "Taj Fort Aguada"],
    food: ["Fisherman’s Wharf", "Martin’s Corner", "Pousada by the Beach"],
  },
  {
    id: 3,
    name: "Jaipur - 3 Days",
    category: "India",
    duration: "3 Days",
    image: "jaipur.jpg",
    details: [
      { day: "Day 1", activities: "Amber Fort, Hawa Mahal" },
      { day: "Day 2", activities: "City Palace, Jantar Mantar" },
      { day: "Day 3", activities: "Nahargarh Fort, Albert Hall Museum" },
    ],
    hotels: ["Rambagh Palace", "Fairmont Jaipur"],
    food: ["Laxmi Mishthan Bhandar", "Suvarna Mahal", "Chokhi Dhani"],
  },
  {
    id: 4,
    name: "Kerala - 5 Days",
    category: "India",
    duration: "5 Days",
    image: "kerala.jpg",
    details: [
      { day: "Day 1", activities: "Munnar Tea Gardens, Eravikulam National Park" },
      { day: "Day 2", activities: "Thekkady Wildlife Sanctuary, Spice Plantation" },
      { day: "Day 3", activities: "Alleppey Backwaters, Houseboat Stay" },
      { day: "Day 4", activities: "Kovalam Beach, Lighthouse Beach" },
      { day: "Day 5", activities: "Poovar Island, Padmanabhaswamy Temple" },
    ],
    hotels: ["Taj Malabar Resort", "Kumarakom Lake Resort"],
    food: ["Dhe Puttu", "Malabar Cafe", "Karavalli"],
  },
  {
    id: 5,
    name: "Delhi - 4 Days",
    category: "India",
    duration: "4 Days",
    image: "delhi.jpg",
    details: [
      { day: "Day 1", activities: "India Gate, Humayun’s Tomb, Akshardham Temple" },
      { day: "Day 2", activities: "Red Fort, Jama Masjid, Chandni Chowk" },
      { day: "Day 3", activities: "Qutub Minar, Lotus Temple, Hauz Khas" },
      { day: "Day 4", activities: "Rajpath, Dilli Haat, Sarojini Market" },
    ],
    hotels: ["The Imperial", "Taj Mahal Hotel"],
    food: ["Karim’s", "Bukhara", "Paranthe Wali Gali"],
  },
  {
    id: 6,
    name: "Rishikesh - 3 Days",
    category: "India",
    duration: "3 Days",
    image: "rishikesh.jpg",
    details: [
      { day: "Day 1", activities: "Lakshman Jhula, Triveni Ghat Aarti" },
      { day: "Day 2", activities: "River Rafting, Neelkanth Mahadev Temple" },
      { day: "Day 3", activities: "Beatles Ashram, Vashishta Cave" },
    ],
    hotels: ["Aloha on the Ganges", "Taj Rishikesh Resort"],
    food: ["Chotiwala", "60’s Beatles Cafe", "Little Buddha Cafe"],
  },

  {
    id: 7,
    name: "Kolkata - 4 Days",
    category: "India",
    duration: "4 Days",
    image: "kolkata.jpg",
    details: [
      { day: "Day 1", activities: "Victoria Memorial, St. Paul's Cathedral" },
      { day: "Day 2", activities: "Howrah Bridge, Dakshineswar Kali Temple" },
      { day: "Day 3", activities: "Indian Museum, Eco Park" },
      { day: "Day 4", activities: "Sundarbans Day Trip" },
    ],
    hotels: ["The Oberoi Grand", "ITC Royal Bengal"],
    food: ["Roshogolla, Mishti Doi, Kathi Rolls, Puchka"],
  },
  
  {
    id: 8,
    name: "Ooty - 4 Days",
    category: "India",
    duration: "4 Days",
    image: "ooty.jpg",
    details: [
      { day: "Day 1", activities: "Botanical Garden, Rose Garden" },
      { day: "Day 2", activities: "Ooty Lake, Doddabetta Peak" },
      { day: "Day 3", activities: "Coonoor - Sim’s Park, Dolphin’s Nose" },
      { day: "Day 4", activities: "Tea Factory Visit, Nilgiri Toy Train" },
    ],
    hotels: ["Savoy - IHCL", "Sterling Ooty Elk Hill"],
    food: ["Shinkow’s, Earl’s Secret, Hotel Nahar"],
  },
  {
    id: 9,
    name: "Shillong - 5 Days",
    category: "India",
    duration: "5 Days",
    image: "shillong.jpg",
    details: [
      { day: "Day 1", activities: "Umiam Lake, Police Bazaar" },
      { day: "Day 2", activities: "Elephant Falls, Shillong Peak" },
      { day: "Day 3", activities: "Cherrapunji - Nohkalikai Falls, Mawsmai Caves" },
      { day: "Day 4", activities: "Dawki River, Mawlynnong Village" },
      { day: "Day 5", activities: "Laitlum Canyons, Local Markets" },
    ],
    hotels: ["Ri Kynjai", "Polo Orchid Resort"],
    food: ["Trattoria, Jadoh, Café Shillong"],
  },
  {
    id: 10,
    name: "Darjeeling - 4 Days",
    category: "India",
    duration: "4 Days",
    image: "darjeeling.jpg",
    details: [
      { day: "Day 1", activities: "Tiger Hill Sunrise, Batasia Loop" },
      { day: "Day 2", activities: "Himalayan Mountaineering Institute, Zoo" },
      { day: "Day 3", activities: "Toy Train Ride, Tea Garden Visit" },
      { day: "Day 4", activities: "Japanese Peace Pagoda, Rock Garden" },
    ],
    hotels: ["Mayfair Darjeeling", "Cedar Inn"],
    food: ["Keventer’s, Glenary’s, Momos from street stalls"],
  },

  // International
  {
    id: 11,
    name: "Paris - 5 Days",
    category: "International",
    duration: "5 Days",
    image: "paris.jpg",
    details: [
      { day: "Day 1", activities: "Eiffel Tower, Seine River Cruise" },
      { day: "Day 2", activities: "Louvre Museum, Champs-Élysées" },
      { day: "Day 3", activities: "Versailles Palace, Montmartre" },
      { day: "Day 4", activities: "Disneyland Paris" },
      { day: "Day 5", activities: "Notre Dame Cathedral, Latin Quarter" },
    ],
    hotels: ["Hotel Lutetia", "Shangri-La Paris"],
    food: ["Café de Flore", "Le Meurice", "Pierre Hermé"],
  },
  {
    id: 12,
    name: "Dubai - 4 Days",
    category: "International",
    duration: "4 Days",
    image: "dubai.jpg",
    details: [
      { day: "Day 1", activities: "Burj Khalifa, Dubai Mall" },
      { day: "Day 2", activities: "Desert Safari, Dhow Cruise" },
      { day: "Day 3", activities: "Palm Jumeirah, Atlantis Water Park" },
      { day: "Day 4", activities: "Dubai Marina, Global Village" },
    ],
    hotels: ["Burj Al Arab", "Atlantis The Palm"],
    food: ["Al Dawaar", "Pierchic", "Zuma Dubai"],
  },
  {
    id: 13,
    name: "Singapore - 5 Days",
    category: "International",
    duration: "5 Days",
    image: "singapore.jpg",
    details: [
      { day: "Day 1", activities: "Marina Bay Sands, Gardens by the Bay" },
      { day: "Day 2", activities: "Sentosa Island, Universal Studios" },
      { day: "Day 3", activities: "Singapore Zoo, River Safari" },
      { day: "Day 4", activities: "Chinatown, Clarke Quay" },
      { day: "Day 5", activities: "Orchard Road Shopping, Little India" },
    ],
    hotels: ["Marina Bay Sands", "Raffles Singapore"],
    food: ["Maxwell Food Centre", "Lau Pa Sat", "Burnt Ends"],
  },
  {
    id: 14,
    name: "New York - 5 Days",
    category: "International",
    duration: "5 Days",
    image: "newyork.jpg",
    details: [
      { day: "Day 1", activities: "Statue of Liberty, Times Square" },
      { day: "Day 2", activities: "Central Park, The Met Museum" },
      { day: "Day 3", activities: "Brooklyn Bridge, DUMBO" },
      { day: "Day 4", activities: "Broadway Show, Empire State Building" },
      { day: "Day 5", activities: "Fifth Avenue, Rockefeller Center" },
    ],
    hotels: ["The Plaza", "Park Hyatt NY"],
    food: ["Katz’s Deli", "Peter Luger", "Shake Shack"],
  },
  {
    id: 15,
    name: "Tokyo - 5 Days",
    category: "International",
    duration: "5 Days",
    image: "tokyo.jpg",
    details: [
      { day: "Day 1", activities: "Shibuya Crossing, Meiji Shrine, Takeshita Street" },
      { day: "Day 2", activities: "Senso-ji Temple, Tokyo Skytree, Akihabara" },
      { day: "Day 3", activities: "Mount Fuji Day Trip, Lake Kawaguchi" },
      { day: "Day 4", activities: "Tsukiji Outer Market, Ginza Shopping, Odaiba" },
      { day: "Day 5", activities: "Ghibli Museum, Ueno Park, TeamLab Planets" },
    ],
    hotels: ["Park Hyatt Tokyo", "Aman Tokyo"],
    food: ["Ichiran Ramen", "Sukiyabashi Jiro", "Ginza Sushi Kyubey"],
  },

  {
    id: 16,
    name: "London - 5 Days",
    category: "International",
    duration: "5 Days",
    image: "london.jpg",
    details: [
      { day: "Day 1", activities: "Buckingham Palace, Big Ben, Westminster Abbey" },
      { day: "Day 2", activities: "Tower of London, Tower Bridge, Thames River Cruise" },
      { day: "Day 3", activities: "British Museum, Covent Garden, Soho Nightlife" },
      { day: "Day 4", activities: "Day Trip to Windsor Castle, Stonehenge" },
      { day: "Day 5", activities: "Camden Market, Sherlock Holmes Museum, Hyde Park" },
    ],
    hotels: ["The Ritz London", "Claridge's"],
    food: ["Sketch London", "Dishoom", "Gordon Ramsay's Restaurant"],
  },
  {
    id: 17,
    name: "Sydney - 5 Days",
    category: "International",
    duration: "5 Days",
    image: "sydney.jpg",
    details: [
      { day: "Day 1", activities: "Sydney Opera House, Circular Quay" },
      { day: "Day 2", activities: "Bondi Beach, Blue Mountains" },
      { day: "Day 3", activities: "Darling Harbour, Taronga Zoo" },
      { day: "Day 4", activities: "Manly Beach, Sydney Harbour Bridge Climb" },
      { day: "Day 5", activities: "Hunter Valley Wine Tour" },
    ],
    hotels: ["Park Hyatt Sydney", "Shangri-La Sydney"],
    food: ["Fish & Chips, Meat Pies, Tetsuya’s Restaurant"],
  },
  {
    id: 18,
    name: "Rome - 5 Days",
    category: "International",
    duration: "5 Days",
    image: "rome.jpg",
    details: [
      { day: "Day 1", activities: "Colosseum, Roman Forum" },
      { day: "Day 2", activities: "Vatican City, St. Peter’s Basilica" },
      { day: "Day 3", activities: "Trevi Fountain, Pantheon" },
      { day: "Day 4", activities: "Piazza Navona, Villa Borghese" },
      { day: "Day 5", activities: "Day Trip to Pompeii" },
    ],
    hotels: ["Hassler Roma", "The St. Regis Rome"],
    food: ["Carbonara, Gelato, Trattoria Dishes"],
  },
  {
    id: 19,
    name: "Istanbul - 5 Days",
    category: "International",
    duration: "5 Days",
    image: "istanbul.jpg",
    details: [
      { day: "Day 1", activities: "Hagia Sophia, Blue Mosque" },
      { day: "Day 2", activities: "Topkapi Palace, Grand Bazaar" },
      { day: "Day 3", activities: "Bosphorus Cruise, Dolmabahçe Palace" },
      { day: "Day 4", activities: "Day Trip to Cappadocia" },
      { day: "Day 5", activities: "Istiklal Street, Taksim Square" },
    ],
    hotels: ["Four Seasons Bosphorus", "Ciragan Palace Kempinski"],
    food: ["Doner Kebab, Baklava, Turkish Delight"],
  }
];

const HomePage2 = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const filteredItineraries =
    selectedCategory === "All"
      ? itineraries
      : itineraries.filter((trip) => trip.category === selectedCategory);

  return (
    <div className="home-container">
      <h1 className="home-title">Best Itineraries for Your Next Trip</h1>
      <p>Here are some of the best itineraries you might like</p>
      <div className="category-tabs">
        {["All", "India", "International"].map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="itinerary-grid">
        {filteredItineraries.map((trip) => (
          <div key={trip.id} className="itinerary-card" onClick={() => setSelectedTrip(trip)}>
            <img src={`/${trip.image}`} alt={trip.name} />
            <div className="itinerary-info">
              <h2>{trip.name.split(" - ")[0]}</h2>
              <p>⏳ {trip.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedTrip && (
        <div className="itinerary-details">
          <h2>{selectedTrip.name} - Itinerary</h2>
          {selectedTrip.details.map((item, index) => (
            <p key={index}><strong>{item.day}:</strong> {item.activities}</p>
          ))}
          <h3>Recommended Hotels:</h3>
          <ul>
            {selectedTrip.hotels.map((hotel, index) => (
              <li key={index}>{hotel}</li>
            ))}
          </ul>
          <h3>Must-Try Food:</h3>
          <ul>
            {selectedTrip.food.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
          <div className="flex">
            <button onClick={() => setSelectedTrip(null)}>Close</button>
            <button onClick={() => setSelectedTrip(null)}>Save</button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default HomePage2;
