from polyglotten.api.views import *
from django.urls import path

app_name = 'polyglotten'


urlpatterns = [
    # User URLS
    path('user-detail/', UserDetailView.as_view(), name='user-detail'),
    path('badges/', BadgeListView.as_view(), name='badges'),
    path('interests/', InterestListView.as_view(), name='interests'),
    path('languages/', LanguageListView.as_view(), name='languages'),

    # Notification URLS
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path('notifications/<pk>/', UpdateNotificationView.as_view(),
         name='notification-read'),
    path('notifications/mark/all/', MarkAllNotificationsView.as_view(),
         name='notifications-all-read'),

    # User Profile URLS
    path('profile/edit/', ProfileEditView.as_view(), name='edit-profile'),

    # Q/A Forum URLS
    path('forum/questions/', QuestionListView.as_view(), name='questions'),
    path('forum/questions/create/',
         QuestionCreateView.as_view(), name="create-question"),
    path('forum/questions/<pk>/update/',
         QuestionUpdateView.as_view(), name='update-question'),
    path('forum/question-detail/<int:id>/',
         QuestionDetailView.as_view(), name='question-detail'),

    path('forum/answers/', AnswerListView.as_view(), name='answers'),
    path('forum/answers/create/', AnswerCreateView.as_view(), name='create-answer'),
    path('forum/answers/<pk>/update/',
         AnswerUpdateView.as_view(), name='update-answer'),

    # Works for both Question and answer
    path('forum/upvote/<str:upvote_type>/<int:id>/',
         UpvoteView.as_view(), name='upvote'),

    # Post URLS
    path('feed/posts/', PostListView.as_view(), name='posts'),
    path('feed/posts/create/', PostCreateView.as_view(), name='create-post'),
    path('feed/posts/<pk>/update/', PostUpdateView.as_view(), name='update-post'),
    path('feed/posts/share/', PostShareView.as_view(), name='share-post'),

    # Comment URLS
    path('feed/comments/', CommentListView.as_view(), name='comments'),
    path('feed/comments/create/', CommentCreateView.as_view(), name='create-comment'),
    path('feed/comments/<pk>/update/',
         CommentUpdateView.as_view(), name='update-comment'),

    # Works for both post and comment
    path('feed/like/<str:like_type>/<int:id>/',
         LikeView.as_view(), name='like'),

    # Quiz URLS
    path('quiz/mcqs/', MCQListView.as_view(), name='mcqs'),
    path('quiz/translations/', TranslationListView.as_view(), name='translations'),
    path('quiz/quiz-detail/<int:id>/',
         QuizDetailView.as_view(), name='quiz-detail'),
    path('quiz/results/', ResultListView.as_view(), name='results'),

    # Message URLS
    path('messages/all/', MessageListView.as_view(), name='messages')

]
