from django.urls import path

from . import views

urlpatterns = [
    path('user', views.user_list),
    path('user/<int:pk>/', views.user_detail),

    path('user/check/', views.user_check),

    #path('problem', views.problem_list),
    path('problem/<int:pk>/', views.problem_detail),

    path('problem/get/', views.problem_get),

    path('recommend', views.ListRecommend.as_view()),
    path('recommend/<int:pk>/', views.DetailRecommend.as_view()),
]