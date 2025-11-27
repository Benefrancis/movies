import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdb';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 space-y-4 px-8 md:px-16 group/row">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide">{title}</h2>
        <div className="hidden md:flex gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300">
          <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div 
        ref={rowRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-4 -ml-4 pl-4 scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {movies.map((movie) => (
          <div 
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="flex-none w-[160px] md:w-[220px] aspect-[2/3] relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-purple-500/20"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Poster Image */}
            <img 
              src={getImageUrl(movie.poster_path, 'w500')} 
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content appearing on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight mb-1">{movie.title}</h3>
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium text-gray-300">{movie.vote_average.toFixed(1)}</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-400">{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
            
            {/* Aceternity Style Border Glow */}
            <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
