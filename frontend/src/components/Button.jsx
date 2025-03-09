export default function Button({ onClick, children }) {
    return (
      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={onClick}>
        {children}
      </button>
    );
  }
  
