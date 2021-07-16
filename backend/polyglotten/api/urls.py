from django.urls import path

app_name='polyglotten'

from polyglotten.api.views import *

urlpatterns = [
    path('user-detail/', UserDetailView.as_view(), name='user-detail'),
    path('rankings/', RankingListView.as_view(), name='rankings'),
    path('interests/', InterestListView.as_view(), name='interests'),
    path('languages/', LanguageListView.as_view(), name='languages'),
    path('questions/', QuestionListView.as_view(), name='questions'),
    path('answers/', AnswerListView.as_view(), name='answers'),
]
