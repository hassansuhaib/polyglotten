from polyglotten.api.views import *
from django.urls import path

app_name = 'polyglotten'


urlpatterns = [
    path('user-detail/', UserDetailView.as_view(), name='user-detail'),
    path('badges/', BadgeListView.as_view(), name='badges'),
    path('interests/', InterestListView.as_view(), name='interests'),
    path('languages/', LanguageListView.as_view(), name='languages'),
    # Forum URLS
    path('questions/', QuestionListView.as_view(), name='questions'),
    path('questions/create', QuestionCreateView.as_view(), name="create-question"),
    path('question-detail/<int:id>',
         QuestionDetailView.as_view(), name='question-detail'),
    path('answers/', AnswerListView.as_view(), name='answers'),
    path('answers/create', AnswerCreateView.as_view(), name='create-answer'),
]
