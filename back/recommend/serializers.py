from rest_framework import serializers
from .models import User, Problem, Recommend

import urllib.request
import urllib.parse
import json

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
        )
        model = User

class ProblemSerializer(serializers.ModelSerializer):
    problemMetadata = serializers.SerializerMethodField()

    class Meta:
        fields = (
            'id',
            'number',
            'problemMetadata',
        )
        model = Problem

    def get_problemMetadata(self, obj):
        url = urllib.request.Request("https://solved.ac/api/v3/problem/show?problemId=" + (str)(obj.number))
        url.add_header("Content-Type", "application/json")
        data = urllib.request.urlopen(url)
        data = data.read()
        data = json.loads(data.decode('utf-8'))
        return data["titleKo"]

class RecommendSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'problems',
        )
        model = Recommend