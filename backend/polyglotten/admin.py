from django.contrib import admin
from .models import User, UserProfile, Ranking, Language, Interest, Question, Answer, Vote

# Register your models here.
admin.site.register(User)
admin.site.register(UserProfile)
admin.site.register(Ranking)
admin.site.register(Language)
admin.site.register(Interest)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Vote)
