import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Spinner from "../componenets/Spinner";
import BackButton from "./components/BackButton";

interface Actor {
  name: string;
  imageUrl: string;
}

interface Film {
  title: string;
  director: string;
  releaseYear: number;
  posterImageUrlA: string;
  bannerImageUrlB: string;
  actors: Actor[];
  filmOverview: string;
}

const CreateFilms: React.FC = () => {
  const [film, setFilm] = useState<Film>({
    title: "",
    director: "",
    releaseYear: 0,
    posterImageUrlA: "",
    bannerImageUrlB: "",
    actors: [],
    filmOverview: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSaveFilm = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/films`, film)
      .then(() => {
        setLoading(false);
        toast.success("Film Created Successfully");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("An error happened. Please check console");
        console.error("Error creating film:", error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilm({
      ...film,
      [name]: name === "releaseYear" ? parseInt(value) : value,
    });
  };

  const handleActorChange = (
    index: number,
    field: keyof Actor,
    value: string
  ) => {
    const updatedActors = [...film.actors];
    updatedActors[index] = { ...updatedActors[index], [field]: value };
    setFilm({ ...film, actors: updatedActors });
  };

  const addActor = () => {
    if (film.actors.length < 5) {
      setFilm({
        ...film,
        actors: [...film.actors, { name: "", imageUrl: "" }],
      });
    } else {
      toast.warning("Maximum 5 actors allowed");
    }
  };

  return (
    <div className="p-4 bg-[#332b12]">
      <BackButton />
      <h1 className="text-3xl my-4 text-white text-center">Create a Film</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full md:w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Title</label>
          <input
            type="text"
            name="title"
            value={film.title}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Director</label>
          <input
            type="text"
            name="director"
            value={film.director}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={film.releaseYear}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Poster Image URL</label>
          <input
            type="url"
            name="posterImageUrlA"
            value={film.posterImageUrlA}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Banner Image URL</label>
          <input
            type="url"
            name="bannerImageUrlB"
            value={film.bannerImageUrlB}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Actors</label>
          {film.actors.map((actor, index) => (
            <div key={index} className="my-2">
              <input
                type="text"
                placeholder="Actor Name"
                value={actor.name}
                onChange={(e) =>
                  handleActorChange(index, "name", e.target.value)
                }
                className="border-2 border-gray-500 px-4 py-2 w-full mb-2"
              />
              <input
                type="url"
                placeholder="Actor Image URL"
                value={actor.imageUrl}
                onChange={(e) =>
                  handleActorChange(index, "imageUrl", e.target.value)
                }
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
          ))}
          <button
            className="p-2 bg-blue-500 text-white rounded-md mt-2"
            onClick={addActor}
          >
            Add Actor
          </button>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Film Overview</label>
          <textarea
            name="filmOverview"
            value={film.filmOverview}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full h-24"
            placeholder="Write a brief overview of the film..."
          />
        </div>
        <button
          className="p-2 bg-yellow-500 hover:bg-red-600 m-8 rounded-md"
          onClick={handleSaveFilm}
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateFilms;
