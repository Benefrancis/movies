import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdb';

interface HeroProps {
  movie: Movie;
  onMoreInfo: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onMoreInfo }) => {
  if (!movie) return null;

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})` }}
      >
        {/* Gradient Overlay - Apple Style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 pb-24 z-10 flex flex-col items-start justify-end h-full">
        <div className="max-w-3xl animate-slide-up space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90 uppercase tracking-wider mb-2">
            Em destaque
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-xl">
            {movie.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 line-clamp-3 md:line-clamp-2 max-w-2xl drop-shadow-md">
            {movie.overview}
          </p>

          <div className="flex flex-row items-center gap-4 pt-4">
            <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 shadow-lg shadow-white/10">
              <Play className="w-5 h-5 fill-current" />
              <span>Assistir</span>
            </button>
            <button 
              onClick={onMoreInfo}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/20 backdrop-blur-md text-white rounded-lg font-semibold border border-white/10 hover:bg-white/30 transition-all duration-200"
            >
              <Info className="w-5 h-5" />
              <span>Mais Informações</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
