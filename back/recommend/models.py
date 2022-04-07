from email.policy import default
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)

class Problem(models.Model):
    number = models.IntegerField(default=0)

class Recommend(models.Model):
    problems = models.JSONField()

