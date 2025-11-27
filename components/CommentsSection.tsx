import React, { useState, useEffect } from 'react';
import { Star, Send, User as UserIcon, Trash2 } from 'lucide-react';
import { Comment } from '../types';
import { addComment, getComments, getAverageUserRating } from '../services/storage';

interface CommentsSectionProps {
  movieId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ movieId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState('Usuário Anônimo');
  const [userAvg, setUserAvg] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, [movieId]);

  const loadData = () => {
    setComments(getComments(movieId));
    setUserAvg(getAverageUserRating(movieId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || rating === 0) return;

    addComment(movieId, {
      movieId,
      userName,
      text: newComment,
      rating,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
    });

    setNewComment('');
    setRating(0);
    loadData();
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white">Comentários e Avaliações</h3>
        {userAvg && (
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="text-sm text-gray-400">Média dos Usuários:</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-bold">{userAvg.toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Sua Avaliação</label>
            <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                >
                <Star 
                    className={`w-8 h-8 ${
                    star <= (hoverRating || rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-600'
                    }`} 
                />
                </button>
            ))}
            </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
            <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-3 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="Seu nome"
            />
            <div className="relative">
                <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="O que você achou do filme?"
                />
                <button
                type="submit"
                disabled={!newComment.trim() || rating === 0}
                className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors shadow-lg"
                >
                <Send className="w-5 h-5" />
                </button>
            </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Seja o primeiro a comentar sobre este filme!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-black/20 border border-white/5 rounded-xl p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {comment.avatarUrl ? (
                    <img src={comment.avatarUrl} alt={comment.userName} className="w-10 h-10 rounded-full bg-gray-700" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white">{comment.userName}</h4>
                    <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < comment.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
