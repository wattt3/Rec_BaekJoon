from rest_framework import serializers
from .models import User, Problem, Recommend

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