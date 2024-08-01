import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../componenets/Spinner";
import { Actor, CreateFilm } from "../icons/types";
import BackButton from "./components/BackButton";
const API_URL = "https://serverfilmolog.onrender.com";

const CreateFilms: React.FC = () => {
  const [film, setFilm] = useState<CreateFilm>({
    title: "",
    director: "",
    releaseYear: 2024,
    posterImageUrlA: "",
    bannerImageUrlB: "",
    actors: [],
    filmOverview: "",
    trailerUrl: "",
    honorableMentions: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSaveFilm = async () => {
    if (
      !film.title ||
      !film.director ||
      !film.releaseYear ||
      !film.posterImageUrlA ||
      !film.bannerImageUrlB ||
      film.actors.length === 0 ||
      !film.filmOverview
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/films`, film);
      toast.success("Film Created Successfully");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while creating the film"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error creating film:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilm((prevFilm) => ({
      ...prevFilm,
      [name]: name === "releaseYear" ? parseInt(value) || 0 : value,
    }));
  };

  const handleActorChange = (
    index: number,
    field: keyof Actor,
    value: string
  ) => {
    setFilm((prevFilm) => {
      const updatedActors = [...prevFilm.actors];
      updatedActors[index] = { ...updatedActors[index], [field]: value };
      return { ...prevFilm, actors: updatedActors };
    });
  };

  const addActor = () => {
    if (film.actors.length < 10) {
      setFilm((prevFilm) => ({
        ...prevFilm,
        actors: [...prevFilm.actors, { name: "", imageUrl: "" }],
      }));
    } else {
      toast.warning("Maximum 10 actors allowed");
    }
  };

  const handleHonorableMentionChange = (index: number, value: string) => {
    setFilm((prevFilm) => {
      const updatedHonorableMentions = [...prevFilm.honorableMentions];
      updatedHonorableMentions[index] = value;
      return { ...prevFilm, honorableMentions: updatedHonorableMentions };
    });
  };

  const addHonorableMention = () => {
    setFilm((prevFilm) => ({
      ...prevFilm,
      honorableMentions: [...prevFilm.honorableMentions, ""],
    }));
  };

  return (
    <div className="p-4 bg-[#332b12]">
      <BackButton />
      <h1 className="text-3xl my-4 text-white text-center">Create a Film</h1>
      {loading && <Spinner />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveFilm();
        }}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-full md:w-[600px] p-4 mx-auto"
      >
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Title</label>
          <input
            type="text"
            name="title"
            value={film.title}
            onChange={handleChange}
            className="border-2 text-black border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Director</label>
          <input
            type="text"
            name="director"
            value={film.director}
            onChange={handleChange}
            className="border-2 text-black border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={film.releaseYear}
            onChange={handleChange}
            className="border-2 text-black border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Poster Image URL</label>
          <input
            type="url"
            name="posterImageUrlA"
            value={film.posterImageUrlA}
            onChange={handleChange}
            className="border-2 text-black border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Banner Image URL</label>
          <input
            type="url"
            name="bannerImageUrlB"
            value={film.bannerImageUrlB}
            onChange={handleChange}
            className="border-2 text-black border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Trailer URL</label>
          <input
            type="url"
            name="trailerUrl"
            value={film.trailerUrl || ""}
            onChange={handleChange}
            className="border-2 text-black border-gray-500 px-4 py-2 w-full"
            placeholder="YouTube video URL"
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
                className="border-2 text-black border-gray-500 px-4 py-2 w-full mb-2"
              />
              <input
                type="url"
                placeholder="Actor Image URL"
                value={actor.imageUrl}
                onChange={(e) =>
                  handleActorChange(index, "imageUrl", e.target.value)
                }
                className="border-2 text-black border-gray-500 px-4 py-2 w-full"
              />
            </div>
          ))}
          <button
            type="button"
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
            className="border-2 text-black border-gray-500 px-4 py-2 w-full"
            rows={4}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Honorable Mentions</label>
          {film.honorableMentions.map((mention, index) => (
            <div key={index} className="my-2">
              <input
                type="text"
                placeholder="Honorable Mention"
                value={mention}
                onChange={(e) =>
                  handleHonorableMentionChange(index, e.target.value)
                }
                className="border-2 text-black border-gray-500 px-4 py-2 w-full"
              />
            </div>
          ))}
          <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded-md mt-2"
            onClick={addHonorableMention}
          >
            Add Honorable Mention
          </button>
        </div>
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-md mt-4"
        >
          Save Film
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateFilms;
