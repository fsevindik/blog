import React from "react";
import { useNavigate } from "react-router-dom";
import { Actor } from "../../types/types";

interface CastSectionProps {
  actors: Actor[];
}

const CastSection: React.FC<CastSectionProps> = ({ actors }) => {
  const navigate = useNavigate();

  const handleActorClick = (actorName: string) => {
    navigate(`/actor/${encodeURIComponent(actorName)}`);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
        Cast
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {actors.map((actor, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center cursor-pointer"
            onClick={() => handleActorClick(actor.name)}
          >
            <img
              src={actor.imageUrl}
              alt={actor.name}
              className="w-20 h-28 sm:w-24 sm:h-32 object-cover p-1 rounded-md mb-2 border-1 bg-slate-100 transition-transform duration-300 transform hover:scale-110"
            />
            <p className="text-gray-900 md:text-sm sm:text-xs font-semibold">
              {actor.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
