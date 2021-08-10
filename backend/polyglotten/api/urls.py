from polyglotten.api.views import *
from django.urls import path

app_name = 'polyglotten'


urlpatterns = [
    # User URLS
    path('user-detail/', UserDetailView.as_view(), name='user-detail'),
    path('badges/', BadgeListView.as_view(), name='badges'),
    path('interests/', InterestListView.as_view(), name='interests'),
    path('languages/', LanguageListView.as_view(), name='languages'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),

    # Forum URLS
    path('questions/', QuestionListView.as_view(), name='questions'),
    path('questions/create', QuestionCreateView.as_view(), name="create-question"),
    path('question-detail/<int:id>',
         QuestionDetailView.as_view(), name='question-detail'),
    path('answers/', AnswerListView.as_view(), name='answers'),
    path('answers/create', AnswerCreateView.as_view(), name='create-answer'),
    path('upvote/<str:upvote_type>/<int:id>',
         UpvoteView.as_view(), name='upvote'),

    # Post URLS
    path('posts/', PostListView.as_view(), name='posts'),
    path('posts/create', PostCreateView.as_view(), name='create-post'),
    path('comments/', CommentListView.as_view(), name='comments'),
    path('comments/create', CommentCreateView.as_view(), name='create-comment'),
    path('like/<str:like_type>/<int:id>',
         LikeView.as_view(), name='like'),

    # Quiz URLS
    path('mcqs/', MCQListView.as_view(), name='mcqs'),
    path('translations/', TranslationListView.as_view(), name='translations'),

]
