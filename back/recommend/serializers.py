from rest_framework import serializers
from .models import User, Problem, Recommend, Text

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

    class Meta:
        fields = (
            'id',
            'number',
        )
        model = Problem

class RecommendSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'problems',
        )
        model = Recommend

class TextSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'text',
        )
        model = Text