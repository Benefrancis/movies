import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieDetails from './components/MovieDetails';
import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getActionMovies 
} from './services/tmdb';
import { Movie } from './types';

const App: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const trending = await getTrendingMovies();
        const popular = await getPopularMovies();
        const topRated = await getTopRatedMovies();
        const action = await getActionMovies();

        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setActionMovies(action);

        // Randomly select a featured movie from popular list
        const randomFeatured = popular[Math.floor(Math.random() * popular.length)];
        setFeaturedMovie(randomFeatured);

      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    loadContent();
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovieId(movie.id);
  };

  const closeDetails = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar onHomeClick={closeDetails} />

      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          onClose={closeDetails} 
        />
      )}

      {featuredMovie && (
        <Hero 
          movie={featuredMovie} 
          onMoreInfo={() => setSelectedMovieId(featuredMovie.id)} 
        />
      )}

      <div className="relative z-10 -mt-24 md:-mt-32 pb-16 space-y-4 bg-gradient-to-t from-black via-black to-transparent">
        <MovieRow 
          title="Tendências da Semana" 
          movies={trendingMovies} 
          onMovieClick={handleMovieClick} 
        />
        
        <MovieRow 
          title="Populares no CineStream" 
          movies={popularMovies} 
          onMovieClick={handleMovieClick} 
        />

        <MovieRow 
          title="Aclamados pela Crítica" 
          movies={topRatedMovies} 
          onMovieClick={handleMovieClick} 
        />

        <MovieRow 
          title="Ação e Aventura" 
          movies={actionMovies} 
          onMovieClick={handleMovieClick} 
        />
      </div>

      <footer className="py-12 px-8 bg-neutral-900/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p className="mb-4">Desenvolvido com ❤️ estilo Apple Video</p>
          <p>© {new Date().getFullYear()} CineStream Pro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
