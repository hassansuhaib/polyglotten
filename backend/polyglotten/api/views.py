from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.generics import DestroyAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FileUploadParser, MultiPartParser

from polyglotten.models import *
from polyglotten.api.serializers import *


""" User Related Views """


class UserDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    def get_object(self):
        try:
            user = User.objects.get(id=self.request.user.id)
            return user
        except User.DoesNotExist:
            raise Http404("User does not exist")

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


class NotificationListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = NotificationSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Notification.objects.filter(user=self.request.user)
        return qs

# API Views


# class EditNotificationSettingsView(APIView):
#     permission_classes = (AllowAny, )

#     def post(self, request, *args, **kwargs):
#         new_settings = request.data.get('settings')
#         try:
#             user_profile = UserProfile.objects.get(user=request.user.id)
#             user_profile.notification_settings.every = new_settings.every
#             user_profile.notification_settings.post = new_settings.post
#             user_profile.notification_settings.friend_request = new_settings.friend_request
#             user_profile.notification_settings.recommendations = new_settings.recommendations
#             user_profile.notification.save()
#             return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Update Views

class ProfileUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        profile = UserProfile.objects.filter(user=self.request.user.id)
        return profile


class NotificationUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = NotificationSerializer

    def get_queryset(self):
        notifications = Notification.objects.filter(user=self.request.user.id)
        return notifications


class MarkAllNotificationsView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        try:
            notifications = Notification.objects.filter(
                read=False, user=request.user.id)
            for notification in notifications:
                notification.read = True
                notification.save()
            return Response(NotificationSerializer(notifications, many=True).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LanguageAddView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        language = request.data.get('language')
        classification = request.data.get('classification')
        try:
            user_profile = UserProfile.objects.get(user=request.user.id)
            language_obj = Languages.objects.get(title=language)
            user_profile.add(language_obj, through_defaults={
                             'classification': classification})
            return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LanguageRemoveView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        language = request.data.get('language')
        try:
            user_profile = UserProfile.objects.get(user=request.user.id)
            language_obj = Languages.objects.get(title=language)
            user_profile.remove(language_obj)
            return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class InterestAddView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        interest = request.data.get('interest')
        try:
            user_profile = UserProfile.objects.get(user=request.user.id)
            interest_obj = Interests.objects.get(title=interest)
            user_profile.add(interest_obj)
            return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class InterestRemoveView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        interest = request.data.get('interest')
        try:
            user_profile = UserProfile.objects.get(user=request.user.id)
            interest_obj = Interests.objects.get(title=interest)
            user_profile.remove(interest_obj)
            return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


""" Misc Views"""


class TagListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = TagSerializer
    pagination_class = None
    queryset = Tag.objects.all()


""" Message Related Views """


class MessageListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = MessageSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Message.objects.filter(
            sender=self.request.user.id, receiver=self.request.user.id)
        return qs


""" Quiz Related Views """

# List Views


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


class ResultListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = ResultSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Result.objects.filter(user=self.request.user)
        return qs

# Detail Views


class QuizDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = QuizSerializer

    def get_object(self):
        level = self.request.query_params.get('level')
        try:
            quiz = Quiz.objects.get(level=level)
            return Quiz
        except:
            raise Http404("Error fetching the quiz.")


# API Views

class QuizCompletionView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        quiz_id = request.data.get('quiz_id')
        vocabulary_answers = request.data.get('vocabulary')
        translation_answers = request.data.get('translations')
        try:
            quiz = Quiz.objects.get(id=quiz_id)
            mcqs = quiz.mcqs.all()
            translations = quiz.translations.all()
            vocab_result = 0
            translation_result = 0
            # The answers should be according to sequence of questions in the quiz for this to work
            for index, mcq in enumerate(mcqs):
                if vocabulary_answers[index] == mcq.answer:
                    vocab_result += 1
            for index, translation in enumerate(translations):
                if translation_answer[index] == translation.answer:
                    translation_result += 1

            result = Result(quiz=quiz, user=request.user,
                            vocabulary=vocab_result, translation=translation_result, level=quiz.level)
            result.save()
            return Response(ResultSerializer(result).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


""" Post Related Views """

# List Views


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

# Create Views


class PostCreateView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        content = request.data.get('content')
        try:
            post = Post(content=content, user=request.user)
            post.save()
            return Response(PostSerializer(post).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CommentCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CommentCreateSerializer
    queryset = Comment.objects.all()


# API Views


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


class PostShareView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        sharing_user = User.objects.get(id=request.user.id)
        shared_content = request.data.get('shared_content')
        post_id = request.data.get('post_id')
        try:
            post = Post.objects.get(id=post_id)
            post.shared_content = shared_content
            post.sharing_user = sharing_user
            post.shared = True
            post.save()
            return Response(PostSerializer(post).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class PostEditView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        edited_content = request.data.get('edited_content')
        post_id = request.data.get('post_id')
        try:
            post = Post.objects.get(id=post_id)
            post.content = edited_content
            post.edited = True
            post.save()
            return Response(PostSerializer(post).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Update Views


class PostUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer

    def get_queryset(self):
        posts = Post.objects.filter(user=self.request.user.id)
        return posts


class CommentUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CommentSerializer

    def get_queryset(self):
        comments = Comment.objects.filter(user=self.request.user.id)
        return comments


""" Q/A Forum Views """

# List Views


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

# Create Views


class QuestionCreateView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        tags = request.data.get('tags')
        title = request.data.get('title')
        content = request.data.get('content')
        try:
            question = Question(user=request.user,
                                title=title, content=content)

            question.save()
            for tag in tags:
                obj, created = Tag.objects.get_or_create(title=tag.title)
                question.tags.add(obj)

            return Response({'Question': 'Created!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class AnswerCreateView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        content = request.data.get('content')
        question_id = request.data.get('question')
        question = Question.objects.get(id=question_id)
        try:
            answer = Answer(user=request.user, content=content,
                            question=question)
            answer.save()
            return Response(AnswerSerializer(answer).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)

# Update Views


class QuestionUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = QuestionSerializer

    def get_queryset(self):
        questions = Question.objects.filter(user=self.request.user.id)
        return questions


class AnswerUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AnswerSerializer

    def get_queryset(self):
        answers = Answer.objects.filter(user=self.request.user.id)
        return answers

# Delete Views


class QuestionDeleteView(DestroyAPIView):
    permission_classes = (AllowAny, )
    queryset = Question.objects.all()


class AnswerDeleteView(DestroyAPIView):
    permission_classes = (AllowAny, )
    queryset = Answer.objects.all()


# API Views


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
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)


""" Voice Channels """


class VoiceChannelCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = VoiceChannelCreationSerializer
    queryset = VoiceChannel.objects.all()


class VoiceChannelDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = VoiceChannelSerializer
    queryset = VoiceChannel.objects.all()


class VoiceChannelListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = VoiceChannelSerializer
    queryset = VoiceChannel.objects.all()


class VoiceChannelUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = VoiceChannelCreationSerializer
    queryset = VoiceChannel.objects.all()
