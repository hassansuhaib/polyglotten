from rest_framework import serializers, fields
from polyglotten.models import User, UserProfile, Ranking, Interest, Language, Question, Answer, Vote

class UserSerialzer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerialzer()
    language = LanguageSerializer()
    class Meta:
        model = UserProfile
        fields = ['user', 'language']

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


class VoteSerializer(serializers.ModelSerializer):
    user = UserSerialzer()
    question = QuestionSerializer()
    answer = AnswerSerializer()
    class Meta:
        model = Vote
        fields = ['user', 'question', 'answer', 'vote_type']


class QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Question
        fields = ['title', 'content', 'created_at', 'user']


class AnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Answer
        fields = ['content', 'created_at', 'user']
        
