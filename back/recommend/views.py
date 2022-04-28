#from importlib.metadata import metadata
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User, Problem, Recommend, Text
from .serializers import UserSerializer, ProblemSerializer, RecommendSerializer, TextSerializer

import urllib.request
import urllib.parse
import json
from collections import OrderedDict

@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def user_check(request):  
    if request.method == 'POST':
        userName = request.data.__getitem__('userName')

        try:
            a = User.objects.get(name = userName)
        except User.DoesNotExist:
            return JsonResponse({'result':False}, status = 200)
        
        return JsonResponse({'result':True}, status = 200)

@api_view(['GET', 'POST'])
def problem_list(request):
    if request.method == 'GET':
        problems = Problem.objects.all()
        serializer = ProblemSerializer(problems, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def problem_detail(request, pk):
    try:
        problem = Problem.objects.get(pk=pk)
    except Problem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProblemSerializer(problem)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProblemSerializer(problem, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        problem.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def problem_get(request):

    if request.method == 'POST':
        userName = request.data.__getitem__('userName')

        rec = User.objects.get(name = userName)
        rec = Recommend.objects.get(id = rec.id)
        serializer = RecommendSerializer(rec)

        metadataList = {'problems':[]}
        for pid in serializer.data['problems']['problemList']:
            prob = Problem.objects.get(id=pid)

            url = urllib.request.Request("https://solved.ac/api/v3/problem/show?problemId=" + (str)(prob.number))
            url.add_header("Content-Type", "application/json")
            data = urllib.request.urlopen(url)
            data = data.read()
            data = json.loads(data.decode('utf-8'))
            metadata = {"problemId":(str)(data["problemId"]), "title":data["titleKo"], 
                        "level":(str)(data["level"]), "averageTries":(str)(data["averageTries"]), 
                        "acceptedUserCount":(str)(data["acceptedUserCount"]), "tags":(str)(data["tags"]), 
                        "link":'https://www.acmicpc.net/problem/' + (str)(data["problemId"])}
            metadataList['problems'].append(metadata)
            
        return JsonResponse(metadataList, status = 200)

class ListRecommend(generics.ListCreateAPIView):
    queryset = Recommend.objects.all()
    serializer_class = RecommendSerializer

class DetailRecommend(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recommend.objects.all()
    serializer_class = RecommendSerializer

class ListText(generics.ListCreateAPIView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer

class DetailText(generics.RetrieveUpdateDestroyAPIView):
    queryset = Text.objects.all()
    serializer_class = TextSerializer