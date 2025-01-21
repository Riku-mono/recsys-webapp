from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie, User, Rating
from .models import ReclistPopularity
from .mappers import MovieMapper, UserMapper, RatingMapper
from rest_framework import status
from django.db.models import Prefetch


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
        user_id = None
        movies = []
        if 'user_id' in request.GET:
            user_id = request.GET.get('user_id')
            movies = Movie.objects.order_by('?')[:20].prefetch_related(
                Prefetch('movie_ratings', queryset=Rating.objects.filter(user_id=user_id))
            )
        else:
            movies = Movie.objects.order_by('?')[:20]
            
        movies_dict = [MovieMapper(movie).as_dict(user_id) for movie in movies]
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
        user_id = None
        movie = {}
        if 'user_id' in request.GET:
            user_id = request.GET.get('user_id')
            movie = Movie.objects.filter(id=id).prefetch_related(
                Prefetch('movie_ratings', queryset=Rating.objects.filter(user_id=user_id))
            ).first()
        else:
            movie = Movie.objects.get(pk=id)
          
        movie_dict = MovieMapper(movie).as_dict(user_id)
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

class MoviesPopularityView(APIView):
    """人気ベース推薦システムによる映画リストビュークラス
    """

    def get(self, request, format=None):
        """対象ジャンルの人気ベース推薦リストを取得する。

        Requests
        --------
        target_genre_id : int
            対象ジャンルID
        user_id : str
            ユーザID

        Returns
        -------
        movies_dict : Response
            映画リスト
        """
        target_genre_id = request.GET.get('target_genre_id')

        user_id = None
        reclist = []
        if 'user_id' in request.GET:
            user_id = request.GET.get('user_id')
            reclist = ReclistPopularity.objects.filter(target_genre_id=target_genre_id)\
                .prefetch_related('movie')\
                .prefetch_related(
                    Prefetch('movie__movie_ratings', queryset=Rating.objects.filter(user_id=user_id))
                ).all()
        else:
            reclist = ReclistPopularity.objects.filter(target_genre_id=target_genre_id)

        movies = [rec.movie for rec in reclist]
        movies_dict = [MovieMapper(movie).as_dict(user_id) for movie in movies]
        return Response(movies_dict, status.HTTP_200_OK)
