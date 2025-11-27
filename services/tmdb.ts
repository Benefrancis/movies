import { Movie, MovieDetails } from '../types';

const API_KEY = 'd4ddd4e2abd38295f816b116ce1f11ae';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRkZDRlMmFiZDM4Mjk1ZjgxNmIxMTZjZTFmMTFhZSIsIm5iZiI6MTY5NzU3ODcwNy4xODEsInN1YiI6IjY1MmVmZWQzMzU4ZGE3NWI1ZjdhYmJlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hBsRApIT3DFytRsd-x8foLf8q0NKcLFNItWQVa9lb20';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

// Helper to handle fetch responses
const fetchTMDB = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('language', 'pt-BR');
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url.toString(), { headers });
  
  if (!response.ok) {
    throw new Error(`TMDB Error: ${response.status}`);
  }
  
  return response.json();
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const data = await fetchTMDB<{ results: Movie[] }>('/trending/movie/week');
  return data.results;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const data = await fetchTMDB<{ results: Movie[] }>('/movie/popular');
  return data.results;
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const data = await fetchTMDB<{ results: Movie[] }>('/movie/top_rated');
  return data.results;
};

export const getActionMovies = async (): Promise<Movie[]> => {
  const data = await fetchTMDB<{ results: Movie[] }>('/discover/movie', { with_genres: '28' });
  return data.results;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  return fetchTMDB<MovieDetails>(`/movie/${id}`, { append_to_response: 'credits,videos,similar' });
};

export const getImageUrl = (path: string | null, size: 'original' | 'w500' | 'w1280' = 'original') => {
  if (!path) return 'https://picsum.photos/500/750?blur=2'; // Fallback
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
