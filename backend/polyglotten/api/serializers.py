from rest_framework import serializers, fields
from polyglotten.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'first_name', 'last_name',
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


class UserLanguageSerializer(serializers.ModelSerializer):
    language = LanguageSerializer()

    class Meta:
        model = UserLanguages
        fields = ['classification', 'language']


class NotificationSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationSettings
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    languages = LanguageSerializer(many=True)
    interests = InterestSerializer(many=True)
    notification_settings = NotificationSettingsSerializer()
    followers = UserSerializer(many=True)
    following = UserSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = ['pk', 'user', 'languages', 'interests',
                  'cover_photo', 'profile_photo', 'notification_settings', 'about', 'followers', 'following']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    likes = UserSerializer(many=True)
    no_of_likes = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'created_at',
                  'edited', 'likes', 'no_of_likes', 'tags', 'mentions']

    def get_no_of_likes(self, obj):
        return obj.number_of_likes()


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    sharing_user = UserSerializer()
    user_profile = serializers.SerializerMethodField()
    tags = TagSerializer(many=True)
    likes = UserSerializer(many=True)
    no_of_likes = serializers.SerializerMethodField()
    no_of_comments = serializers.SerializerMethodField()
    images = PostImageSerializer(many=True)
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'images', 'created_at', 'edited', 'no_of_likes', 'no_of_comments', 'likes', 'comments',
                  'tags', 'mentions', 'shared', 'shared_content', 'shared_at', 'sharing_user', 'user_profile']

    def get_no_of_likes(self, obj):
        return obj.number_of_likes()

    def get_no_of_comments(self, obj):
        return obj.number_of_comments()

    def get_user_profile(self, obj):
        profile = obj.get_user_profile()
        print("Profile", profile)
        return UserProfileSerializer(profile).data


class QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    tags = TagSerializer(many=True)
    no_of_votes = serializers.SerializerMethodField()
    votes = UserSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'created_at',
                  'user', 'edited', 'tags', 'no_of_votes', 'votes']

    def get_no_of_votes(self, obj):
        return obj.number_of_votes()


class AnswerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    no_of_votes = serializers.SerializerMethodField()
    votes = UserSerializer(many=True)

    class Meta:
        model = Answer
        fields = ['id', 'content', 'created_at',
                  'user', 'edited', 'no_of_votes', 'votes']

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
                  'translation', 'created_at', 'passed', 'level', 'language']


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
    translations = TranslationSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'level', 'mcqs', 'translations', 'time']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['pk', 'url', 'content', 'read', 'created_at']


class VoiceChannelSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)
    number_of_users = serializers.SerializerMethodField()
    language = LanguageSerializer()

    class Meta:
        model = VoiceChannel
        fields = ['id', 'users', 'language', 'number_of_users', 'topic', 'url']

    def get_number_of_users(self, obj):
        return obj.number_of_users()


# Creation Serializers

class VoiceChannelCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceChannel
        fields = '__all__'


class QuestionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

# Chat Related Serializers


class ContactSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
        read_only = ('id')

    def create(self, validated_data):
        print(validated_data)
        participants = validated_data.pop('participants')
        chat = Chat()
        chat.save()
        for username in participants:
            user = User.objects.get(username=username)
            contact = Contact.objects.get(user=user)
            chat.participants.add(contact)
        chat.save()
        return chat
