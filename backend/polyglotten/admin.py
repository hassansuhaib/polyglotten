from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(UserProfile)
admin.site.register(Badge)
admin.site.register(Language)
admin.site.register(Interest)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Tag)
admin.site.register(Post)
admin.site.register(PostImage)
admin.site.register(Comment)
admin.site.register(VoiceChannel)
admin.site.register(Message)
admin.site.register(Notification)
