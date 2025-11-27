export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  status: string;
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface Comment {
  id: string;
  movieId: number;
  userName: string;
  text: string;
  rating: number; // 1-5 stars
  createdAt: string;
  avatarUrl?: string;
}

export interface User {
  name: string;
  avatar: string;
}

// Mimic Aceternity/Modern UI types
export interface TabItem {
  id: string;
  label: string;
}
