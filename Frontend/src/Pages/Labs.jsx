import React from "react";
import { useNavigate } from "react-router-dom";
export default function Labs() {
  const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      name: "AI Learning Assistant",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdiUQ0cTOuM8-yxHqbMzuu6K-gyD9uDJSxcA&s",
    },
    {
      id: 2,
      name: "Physics AR Lab",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq6xHqhLehwqu6msx-BblbkxDMdywy32Wu0g&s",
    },
    {
      id: 3,
      name: "Chemistry AR Lab",
      image: "https://uwaterloo.ca/news/sites/ca.news/files/styles/feature_large/public/chemed-lab-220x140.jpg?itok=mQODVYbh",
    },
  ];

  const handleOpenLab =()=>{
    navigate('/lab');
  }
  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Glow Effect */}
        <div className="purple-glow-top"></div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white z-10 leading-tight max-w-3xl">
          Start learning with powerful AR-enabled virtual labs
        </h1>

        {/* Input + Button */}
        <div className="flex mt-8 z-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full p-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search for labs..."
            className="flex-1 bg-transparent outline-none text-white px-4 placeholder-gray-300"
          />
          <button className="px-6 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-semibold transition">
            Search
          </button>
        </div>

 
      </div>

        <div className="relative w-full flex flex-col items-center justify-center text-center px-6 pb-12 overflow-hidden">
   

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full max-w-6xl z-10">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={handleOpenLab}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full h-40 rounded-xl overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-white mt-4 text-lg font-semibold">
                {card.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
