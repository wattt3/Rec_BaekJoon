from django.contrib import admin

from .models import User, Problem, Recommend, Text

admin.site.register(User)
admin.site.register(Problem)
admin.site.register(Recommend)
admin.site.register(Text)