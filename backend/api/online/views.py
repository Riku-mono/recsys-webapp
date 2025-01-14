from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie, User, Rating
from .mappers import MovieMapper, UserMapper, RatingMapper
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

class UserView(APIView):
    """
    ユーザビュークラス
    """

    def get(self, request, format=None):
        """
        ユーザを取得する。
        
        Requests
        --------
        email : str
            メールアドレス

        Returns
        -------
        users_dict : Response
            ユーザリスト
        """
        email = request.GET.get('email')
        users = User.objects.filter(email=email)
        users_dict = [UserMapper(user).as_dict() for user in users]
        return Response(users_dict, status.HTTP_200_OK)

    def post(self, request, format=None):
        """
        ユーザを登録する。

        Requests
        --------
        id : str
            ユーザID
        email : str
            メールアドレス

        Returns
        -------
        users_dict : Response
            ユーザリスト
        """
        id = request.data['id']
        email = request.data['email']
        user = User(id=id, email=email)
        user.save()
        user_dict = UserMapper(user).as_dict()
        return Response(user_dict, status.HTTP_201_CREATED)

class RatingView(APIView):
    """評価値ビュークラス
    """

    def get(self, request, format=None):
        """評価値を取得する。

        Requests
        --------
        id : str
            評価値ID

        Returns
        -------
        ratings_dict : Response
            評価値リスト
        """
        id = request.GET.get('id')
        ratings = Rating.objects.filter(id=id)
        ratings_dict = [RatingMapper(rating).as_dict() for rating in ratings]
        return Response(ratings_dict, status.HTTP_200_OK)

    def post(self, request, format=None):
        """評価値を登録する。

        Requests
        --------
        id : str
            評価値ID
        user_id : str
            ユーザID
        movie_id : int
            映画ID
        rating : float
            評価値

        Returns
        -------
        rating_dict : Response
            評価値
        """
        id = request.data['id']
        user_id = request.data['user_id']
        movie_id = request.data['movie_id']
        rating = request.data['rating']
        user = User.objects.get(pk=user_id)
        movie = Movie.objects.get(pk=movie_id)
        rating_model = Rating(id=id, user=user, movie=movie, rating=rating)
        rating_model.save()
        rating_dict = RatingMapper(rating_model).as_dict()
        return Response(rating_dict, status.HTTP_201_CREATED)
