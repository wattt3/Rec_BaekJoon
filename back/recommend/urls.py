from django.urls import path

from . import views

urlpatterns = [
    path('user', views.ListUser.as_view()),
    path('user/<int:pk>/', views.DetailUser.as_view()),

    path('problem', views.ListProblem.as_view()),
    path('problem/<int:pk>/', views.DetailProblem.as_view()),

    path('recommend', views.ListRecommend.as_view()),
    path('recommend/<int:pk>/', views.DetailRecommend.as_view()),
]