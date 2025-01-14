import uuid
from django.db import models

class Genre(models.Model):
    """ジャンルモデル

    Attributes
    ----------
    id : IntegerField
        ジャンルID
    name : TextField
        ジャンル名
    """
    id = models.IntegerField(primary_key=True)
    name = models.TextField(blank=False, null=False)

    class Meta:
        managed = True
        db_table = 'genres'

    def __str__(self):
        return '{}:{}'.format(self.id, self.name)
    
class Movie(models.Model):
    """映画モデル

    Attributes
    ----------
    id : IntegerField
        映画ID
    title : TextField
        タイトル
    year : IntegerField
        公開年
    genres : ManyToManyField
        ジャンルリスト
    imdb_id: IntegerField
        IMDb ID
    tmdb_id: IntegerField
        TMDB ID
    """
    id = models.IntegerField(primary_key=True)
    title = models.TextField(blank=False, null=False)
    year = models.IntegerField(blank=True, null=True)
    genres = models.ManyToManyField(Genre)
    imdb_id = models.IntegerField(blank=True, null=True)
    tmdb_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'movies'

    def __str__(self):
        return '{}:{}({})'.format(self.id, self.title, self.year, self.genres, self.imdb_id, self.tmdb_id)

class User(models.Model):
    """ユーザモデル

    Attributes
    ----------
    id : UUIDField
        ユーザID
    email : EmailField
        emailアドレス
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=254, blank=False, null=False, unique=True)

    class Meta:
        managed = True
        db_table = 'users'

    def __str__(self):
        return '{}:{}'.format(self.id, self.email)

class Rating(models.Model):
    """評価値モデル

    Attributes
    ----------
    id : TextField
        評価値ID
    user : ForeignKey[User]
        対象ユーザ
    movie : ForeignKey[Movie]
        対象映画
    rating : IntegerField
        評価値
    """
    id = models.TextField(primary_key=True, max_length=43)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, related_name='movie_ratings', on_delete=models.CASCADE)
    rating = models.FloatField(blank=False, null=False)
    rated_at = models.DateTimeField(blank=False, null=False, auto_now=True)

    class Meta:
        managed = True
        db_table = 'ratings'

    def __str__(self):
        return '{}:{}:{}:{}'.format(self.id, self.user.id, self.movie.id, self.rating)