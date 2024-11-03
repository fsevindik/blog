import React from "react";
import GitHubIcon from "../../icons/GithubIcon";
import LinkedInIcon from "../../icons/LinkedInIcon ";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-center max-h-20 py-4 w-full mt-auto">
      <div className="container mx-auto">
        <p className="text-gray-300 font-semibold">
          &copy; 2024{" "}
          <a
            href="https://fsevindik.github.io/myportfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-yellow-500 mr-2 font-cursive"
          >
           Fırat Sevindik</a>
          <a
            href="https://github.com/fsevindik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-yellow-500"
          >
            <GitHubIcon
              className="inline-block align-text-bottom mt-2"
              size={24}
              color="currentColor"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/f%C4%B1rat-sevindik-7660a8282/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400 mr-2"
          >
            <LinkedInIcon
              className="inline-block align-text-bottom ml-3"
              size={24}
              color="currentColor"
            />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
