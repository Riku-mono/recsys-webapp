from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie
from .mappers import MovieMapper
from rest_framework import status


class MoviesView(APIView):
    """映画リストビュークラス
    """

    def get(self, request, format=None):
        """映画リストを取得する。

        Returns
        -------
        movies_dict : Response
            映画リスト
        """
        movies = Movie.objects.order_by('?')[:20]
        movies_dict = [MovieMapper(movie).as_dict() for movie in movies]
        return Response(movies_dict, status.HTTP_200_OK)

class MovieView(APIView):
    """映画ビュークラス
    """

    def get(self, request, id, format=None):
        """
        映画を取得する。
        
        Returns
        -------
        movie_dict : Response
            映画
        """
        movie = Movie.objects.get(pk=id)
        movie_dict = MovieMapper(movie).as_dict()
        return Response(movie_dict, status.HTTP_200_OK)
