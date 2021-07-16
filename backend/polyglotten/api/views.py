from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.generics import DestroyAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination

from polyglotten.models import User, UserProfile, Ranking, Interest, Language, Question, Answer, Vote
from polyglotten.api.serializers import UserSerialzer, UserProfileSerializer, RankingSerializer, InterestSerializer, LanguageSerializer, QuestionSerializer, AnswerSerializer, VoteSerializer


class UserDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer

    def get_object(self):
        try:
            user = User.objects.get(id=self.request.user.id)
            return user
        except User.DoesNotExist:
            raise Http404("User does not exist")


class RankingListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = RankingSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Header.objects.all()
        return qs


class InterestListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = InterestSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Header.objects.all()
        return qs


class LanguageListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = LanguageSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Header.objects.all()
        return qs


class QuestionListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = QuestionSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Header.objects.all()
        return qs


class AnswerListView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = AnswerSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Header.objects.all()
        return qs

