import React from "react";

interface YouTubeEmbedProps {
  trailerId: string;
  title: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ trailerId, title }) => {
  return (
    <div className="w-full flex justify-center">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${trailerId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg border-4 border-gray-900"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
