import { Link } from 'react-router-dom';
export default function Header(){
  return (
    <header className="bg-purple-600 text-white p-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-lg font-bold">Get Set Go!</div>
        <div className="flex gap-6">
          <Link to="/home2" className="hover:text-purple-200">Home</Link>
          <Link to="/home" className="hover:text-purple-200">Trip Planner</Link>
          <Link to="/expense-tracker" className="hover:text-purple-200">Expense Tracker</Link>
          <Link to="/language-translator" className="hover:text-purple-200">Language Translator</Link>
          <Link to="/SmartPackingList" className="hover:text-purple-200">Packing List</Link>
          <Link to="/my-itineraries" className="hover:text-purple-200">My Itineraries</Link>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </nav>
    </header>
  );
};