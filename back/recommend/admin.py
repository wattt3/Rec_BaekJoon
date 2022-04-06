from django.contrib import admin

from .models import User, Problem, Recommend

admin.site.register(User)
admin.site.register(Problem)
admin.site.register(Recommend)