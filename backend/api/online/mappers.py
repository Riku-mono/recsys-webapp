class MovieMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self, user_id):
        movie = self.obj
        genres = [genre.name for genre in movie.genres.all()]
        
        rating = None
        if user_id is not None:
            rating_model = movie.movie_ratings.first()
            rating = RatingMapper(rating_model).as_dict() if rating_model else None

        return {
            'id': movie.id,
            'title': movie.title,
            'year': movie.year,
            'genres': genres,
            'imdb_id': movie.imdb_id,
            'tmdb_id': movie.tmdb_id,
            'rating': rating,
        }
    
class UserMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self):
        user = self.obj
        
        return {
            'id': user.id,
            'email': user.email,
        }

class RatingMapper:
  def __init__(self, obj):
    self.obj = obj

  def as_dict(self):
    rating = self.obj
    
    return {
      'id': rating.id,
      'user_id': rating.user.id,
      'movie_id': rating.movie.id,
      'rating': rating.rating,
      'rated_at': rating.rated_at,
    }
