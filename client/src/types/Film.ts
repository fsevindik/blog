import { ReactNode } from "react";

export interface Film {
  publishYear: ReactNode;
  _id: string;
  filmId: string;
  title: string;
  director: string;
  releaseYear: number;
  posterImageUrlA: string;
  bannerImageUrlB: string;
  actors: [];
  filmOverview: string;
}
