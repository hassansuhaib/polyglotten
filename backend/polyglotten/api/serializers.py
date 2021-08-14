from rest_framework import serializers, fields
from polyglotten.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'id',
                  'username', 'is_active', 'gender']


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


class NotificationSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationSettings
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    languages = LanguageSerializer(many=True)
    interests = InterestSerializer(many=True)
    notification_settings = NotificationSettingsSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'languages', 'interests',
                  'cover_photo', 'profile_photo', 'notification_settings', 'about']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    sharing_user = UserSerializer()
    tags = TagSerializer(many=True)
    no_of_likes = serializers.SerializerMethodField()
    images = PostImageSerializer(many=True)

    class Meta:
        model = Post
        fields = ['user', 'content', 'images', 'created_at', 'edited', 'no_of_likes', 'likes',
                  'tags', 'mentions', 'shared', 'shared_content', 'shared_at', 'sharing_user']

    def get_no_of_likes(self, obj):
        return obj.number_of_likes()


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    no_of_likes = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['user', 'post', 'content', 'created_at',
                  'edited', 'likes', 'no_of_likes', 'tags', 'mentions']

    def get_no_of_likes(self, obj):
        return obj.number_of_likes()


class QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    tags = TagSerializer(many=True)
    no_of_votes = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'created_at',
                  'user', 'edited', 'tags', 'no_of_votes']

    def get_no_of_votes(self, obj):
        return obj.number_of_votes()


class AnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    no_of_votes = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        fields = ['id', 'content', 'created_at',
                  'user', 'edited', 'no_of_votes']

    def get_no_of_votes(self, obj):
        return obj.number_of_votes()


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['content', 'image', 'edited',
                  'edited_content', 'sender', 'receiver', 'created_at']


class ResultSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Result
        fields = ['quiz', 'user', 'vocabulary',
                  'translation', 'created_at', 'passed', 'level']


class MCQSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCQ
        fields = '__all__'


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    mcqs = MCQSerializer(many=True)
    tranlations = TranslationSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'level', 'mcqs', 'translations', 'time']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class VoiceChannelSerializer(serializers.ModelSerializer):
    user_1 = UserSerializer()
    user_2 = UserSerializer()
    user_3 = UserSerializer()
    user_4 = UserSerializer()

    class Meta:
        model = VoiceChannel
        fields = ['id', 'user_1', 'user_2',
                  'user_3', 'user_4', 'language', 'full']


# Creation Serializers

class VoiceChannelCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceChannel
        fields = '__all__'


class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class AnswerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['question', 'content', 'user']


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
