from rest_framework import serializers, fields
from polyglotten.models import User, UserProfile, Ranking, Interest, Language, Question, Answer, Vote


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'is_active', 'email']


class RankingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking
        fields = ['title']


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['title']


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['title', 'classification']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    language = LanguageSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'language']


class QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'created_at', 'user']


class AnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Answer
        fields = ['id', 'content', 'created_at', 'user']


class VoteSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    question = QuestionSerializer()
    answer = AnswerSerializer()

    class Meta:
        model = Vote
        fields = ['user', 'question', 'answer', 'vote_type']
