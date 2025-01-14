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
