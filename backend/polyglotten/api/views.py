from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.generics import DestroyAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination

from polyglotten.models import *
from polyglotten.api.serializers import *
# Detail Views


class UserDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    def get_object(self):
        try:
            user = User.objects.get(id=self.request.user.id)
            return user
        except User.DoesNotExist:
            raise Http404("User does not exist")


class QuestionDetailView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, id, *args, **kwargs):
        try:
            question = Question.objects.get(id=id)
            answers = question.answers.all()
            question_serializer = QuestionSerializer(question)
            answers_serializer = AnswerSerializer(answers, many=True)
            return Response({'question': question_serializer.data, 'answers': answers_serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)


# List Views

class BadgeListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = BadgeSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Badge.objects.all()
        return qs


class InterestListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = InterestSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Interest.objects.all()
        return qs


class LanguageListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = LanguageSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Language.objects.all()
        return qs


class CommentListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CommentSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Comment.objects.all()
        return qs


class PostListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Post.objects.all()
        return qs


class MessageListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = MessageSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Message.objects.all()
        return qs


class MCQListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = MCQSerializer
    pagination_class = None

    def get_queryset(self):
        qs = MCQ.objects.all()
        return qs


class TranslationListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = TranslationSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Translation.objects.all()
        return qs


class NotificationListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = NotificationSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Notification.objects.all()
        return qs


class QuestionListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = QuestionSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Question.objects.all()
        return qs


class AnswerListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AnswerSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Answer.objects.all()
        return qs

# Post Related Views


class LikeView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, like_type, id, *args, **kwargs):
        try:
            user = User.objects.get(id=request.user.id)
            if like_type == 'comment':
                comment = Comment.objects.get(id=id)
                comment.likes.add(user)
            else:
                post = Post.objects.get(id=id)
                post.likes.add(user)
            return Response({'Message': 'Liked!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_200_OK)


# Q/A Forum Views

class UpvoteView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, upvote_type, id, *args, **kwargs):
        try:
            user = User.objects.get(id=request.user.id)
            if upvote_type == 'answer':
                answer = Answer.objects.get(id=id)
                answer.votes.add(user)
            else:
                question = Question.objects.get(id=id)
                question.votes.add(user)
            return Response({'Message': 'Upvoted!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_200_OK)

# Create API Views


class QuestionCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = QuestionCreateSerializer
    queryset = Question.objects.all()


class AnswerCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = QuestionCreateSerializer
    queryset = Answer.objects.all()


class PostCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()


class CommentCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CommentCreateSerializer
    queryset = Comment.objects.all()
