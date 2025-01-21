from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MoviesView.as_view()),
    path('movies/<int:id>/', views.MovieView.as_view()),
    path('users/', views.UserView.as_view()),
    path('ratings/', views.RatingView.as_view()),
    path('movies_popularity/', views.MoviesPopularityView.as_view()),
]