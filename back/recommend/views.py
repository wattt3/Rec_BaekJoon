from django.shortcuts import render
from rest_framework import generics

from .models import User, Problem, Recommend
from .serializers import UserSerializer, ProblemSerializer, RecommendSerializer

class ListUser(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ListProblem(generics.ListCreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer

class DetailProblem(generics.RetrieveUpdateDestroyAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer


class ListRecommend(generics.ListCreateAPIView):
    queryset = Recommend.objects.all()
    serializer_class = RecommendSerializer

class DetailRecommend(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recommend.objects.all()
    serializer_class = RecommendSerializer