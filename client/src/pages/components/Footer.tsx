import React from "react";
import GithubIcon from "../../icons/GithubIcon";
import LinkedInIcon from "../../icons/LinkedInIcon ";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-center py-4 w-full mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
        <span className="text-gray-300 font-semibold text-sm md:text-lg">
          &copy; 2025
        </span>

        <a
          href="https://fsevindik.github.io/portfoliopage/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-yellow-500 font-mono text-sm md:text-lg"
        >
          Fırat Sevindik
        </a>

        <div className="flex space-x-3">
          <a
            href="https://github.com/fsevindik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-500"
          >
            <GithubIcon className="w-5 h-5 md:w-7 md:h-7" size={0} />
          </a>

          <a
            href="https://www.linkedin.com/in/f%C4%B1rat-sevindik-7660a8282/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400"
          >
            <LinkedInIcon className="w-5 h-5 md:w-7 md:h-7" size={0} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
