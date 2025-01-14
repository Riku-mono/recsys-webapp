from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MoviesView.as_view()),
    path('movies/<int:id>/', views.MovieView.as_view()),
]