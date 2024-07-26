import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../componenets/Spinner";
import { Film } from "../types/Film";
import BackButton from "./components/BackButton";

interface Actor {
  name: string;
  imageUrl: string;
}

const EditFilm: React.FC = () => {
  const [film, setFilm] = useState<Film>({
    _id: "",
    filmId: "",
    title: "",
    director: "",
    releaseYear: 2024,
    posterImageUrlA: "",
    bannerImageUrlB: "",
    actors: [],
    filmOverview: "",
    publishYear: null,
    ratings: [],
    trailerUrl: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/films/${id}`);
        setFilm(response.data);
      } catch (error) {
        toast.error("Error fetching film data");
        console.error("Error fetching film:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  const handleUpdateFilm = async () => {
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
      await axios.put(`http://localhost:3000/films/${id}`, film);
      toast.success("Film Updated Successfully");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while updating the film"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error updating film:", error);
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
    if (film.actors.length < 5) {
      setFilm((prevFilm) => ({
        ...prevFilm,
        actors: [...prevFilm.actors, { name: "", imageUrl: "" }],
      }));
    } else {
      toast.warning("Maximum 5 actors allowed");
    }
  };

  const removeActor = (index: number) => {
    setFilm((prevFilm) => ({
      ...prevFilm,
      actors: prevFilm.actors.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4 bg-[#332b12]">
      <BackButton />
      <h1 className="text-3xl my-4 text-white text-center">Edit Film</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateFilm();
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
            <div key={index} className="my-2 flex items-center">
              <input
                type="text"
                placeholder="Actor Name"
                value={actor.name}
                onChange={(e) =>
                  handleActorChange(index, "name", e.target.value)
                }
                className="border-2 text-black border-gray-500 px-4 py-2 w-full mb-2 mr-2"
              />
              <input
                type="url"
                placeholder="Actor Image URL"
                value={actor.imageUrl}
                onChange={(e) =>
                  handleActorChange(index, "imageUrl", e.target.value)
                }
                className="border-2 text-black border-gray-500 px-4 py-2 w-full mb-2 mr-2"
              />
              <button
                type="button"
                onClick={() => removeActor(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
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
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Update Film
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default EditFilm;
