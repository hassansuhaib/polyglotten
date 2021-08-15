from django.contrib import admin
from .models import *

# Register your models here.


class PostImageAdmin(admin.StackedInline):
    model = PostImage

    def get_extra(self, request, obj=None, **kwargs):
        extra = 0
        return extra


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageAdmin]
    fields = ('user', 'content', 'edited', 'likes',
              'shared', 'shared_at', 'shared_content', 'sharing_user')


admin.site.register(User)
admin.site.register(UserProfile)
admin.site.register(Badge)
admin.site.register(Language)
admin.site.register(Interest)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Tag)
admin.site.register(PostImage)
admin.site.register(Comment)
admin.site.register(VoiceChannel)
admin.site.register(Message)
admin.site.register(Notification)
