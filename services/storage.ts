import { Comment } from '../types';

const COMMENTS_KEY_PREFIX = 'cinestream_comments_';

export const getComments = (movieId: number): Comment[] => {
  try {
    const data = localStorage.getItem(`${COMMENTS_KEY_PREFIX}${movieId}`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading comments", e);
    return [];
  }
};

export const addComment = (movieId: number, comment: Omit<Comment, 'id' | 'createdAt'>): Comment => {
  const newComment: Comment = {
    ...comment,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const currentComments = getComments(movieId);
  const updatedComments = [newComment, ...currentComments];
  
  localStorage.setItem(`${COMMENTS_KEY_PREFIX}${movieId}`, JSON.stringify(updatedComments));
  return newComment;
};

export const getAverageUserRating = (movieId: number): number | null => {
  const comments = getComments(movieId);
  const ratings = comments.filter(c => c.rating > 0);
  if (ratings.length === 0) return null;
  
  const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return sum / ratings.length;
};
