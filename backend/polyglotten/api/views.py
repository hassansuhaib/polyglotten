from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.generics import DestroyAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination

from polyglotten.models import User, UserProfile, Ranking, Interest, Language, Question, Answer, Vote
from polyglotten.api.serializers import UserSerializer, UserProfileSerializer, RankingSerializer, InterestSerializer, LanguageSerializer, QuestionSerializer, AnswerSerializer, VoteSerializer

# Detail Views


class UserDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
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

class RankingListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = RankingSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Ranking.objects.all()
        return qs


class InterestListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = InterestSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Interest.objects.all()
        return qs


class LanguageListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = LanguageSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Language.objects.all()
        return qs


class QuestionListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = QuestionSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Question.objects.all()
        return qs


class AnswerListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AnswerSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Answer.objects.all()
        return qs

# Create API Views


class QuestionCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class AnswerCreateView(CreateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()
