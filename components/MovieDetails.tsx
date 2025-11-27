import React, { useEffect, useState } from 'react';
import { X, Play, Clock, Calendar, Star, TrendingUp } from 'lucide-react';
import { MovieDetails as MovieDetailsType, CastMember } from '../types';
import { getMovieDetails, getImageUrl } from '../services/tmdb';
import CommentsSection from './CommentsSection';

interface MovieDetailsProps {
  movieId: number;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movieId, onClose }) => {
  const [details, setDetails] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setDetails(data);
      } catch (error) {
        console.error("Failed to load details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [movieId]);

  if (loading || !details) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black animate-fade-in">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Hero Header */}
      <div className="relative w-full h-[70vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${getImageUrl(details.backdrop_path, 'original')})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start justify-end">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            {details.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 mb-8 font-medium">
            <span className="text-green-400 font-bold">{Math.round(details.vote_average * 10)}% Relevância</span>
            <span>{new Date(details.release_date).getFullYear()}</span>
            <span>{details.runtime} min</span>
            <div className="flex gap-2">
              {details.genres.map(g => (
                <span key={g.id} className="px-2 py-0.5 rounded border border-white/20 text-xs">
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors">
              <Play className="w-5 h-5 fill-current" /> Assistir
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-colors">
              Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Sinopse</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {details.overview}
              </p>
            </div>

            {/* Cast Row */}
            {details.credits && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Elenco Principal</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {details.credits.cast.slice(0, 10).map((actor: CastMember) => (
                    <div key={actor.id} className="flex-none w-24 md:w-32 text-center group">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-white/50 transition-all">
                        <img 
                          src={getImageUrl(actor.profile_path, 'w500')} 
                          alt={actor.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <p className="text-sm font-medium text-white line-clamp-1">{actor.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="border-t border-white/10 pt-10">
                <CommentsSection movieId={details.id} />
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-4">Informações</h4>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-2"><Clock className="w-4 h-4" /> Duração</span>
                        <span className="text-white">{Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> Lançamento</span>
                        <span className="text-white">{new Date(details.release_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Status</span>
                        <span className="text-white">{details.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400 flex items-center gap-2"><Star className="w-4 h-4" /> TMDB Rating</span>
                        <span className="text-yellow-400 font-bold">{details.vote_average.toFixed(1)}</span>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-gray-400 text-sm italic">"{details.tagline}"</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
