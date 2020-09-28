export interface Serie {
  poster_path: string|null;
  popularity: number;
  id: string|number; // integer
  backdrop_path: string|null;
  vote_average: number;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  overview: string;
  original_language: string;
  vote_count: string|number; // integer
  name: string;
  original_name: string;
}
