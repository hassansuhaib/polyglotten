from django.contrib import admin
from .models import User, UserProfile, Badge, Language, Interest, Question, Answer

# Register your models here.
admin.site.register(User)
admin.site.register(UserProfile)
admin.site.register(Badge)
admin.site.register(Language)
admin.site.register(Interest)
admin.site.register(Question)
admin.site.register(Answer)
