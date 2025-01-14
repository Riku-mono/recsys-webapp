class MovieMapper:
    def __init__(self, obj):
        self.obj = obj

    def as_dict(self):
        movie = self.obj
        genres = [genre.name for genre in movie.genres.all()]
        
        return {
            'id': movie.id,
            'title': movie.title,
            'year': movie.year,
            'genres': genres,
            'imdb_id': movie.imdb_id,
            'tmdb_id': movie.tmdb_id,
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
