from rest_framework import serializers, fields
from polyglotten.models import User, UserProfile, Badge, Interest, Language, Question, Answer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = '__all__'


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    language = LanguageSerializer()
    interest = InterestSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'language', 'interest']


class QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'created_at', 'user']


class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Answer
        fields = ['id', 'content', 'created_at', 'user']


class AnswerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
