from django.shortcuts import get_object_or_404
from django.http import Http404
from django.db.models import Q
from rest_framework import status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.generics import DestroyAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FileUploadParser, MultiPartParser
from difflib import SequenceMatcher

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


class UserUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    queryset = User.objects.all()


class ProfileUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class ProfileDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserProfileSerializer

    def get_object(self):
        username = self.kwargs.get('username')
        try:
            profile = UserProfile.objects.get(
                user__username=username)
            return profile
        except UserProfile.DoesNotExist:
            raise Http404("User Profile does not exist")


class UserSearchView(ListAPIView):
    permission_classes = (AllowAny, )
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['username', 'first_name', 'last_name']
    search_fields = ['username', 'first_name', 'last_name']


class NotificationSettingsUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = NotificationSettingsSerializer
    queryset = NotificationSettings.objects.all()


class NotificationSettingsDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = NotificationSettingsSerializer

    def get_object(self):
        try:
            profile = UserProfile.objects.get(user=self.request.user.id)
            settings = profile.notification_settings
            return settings
        except NotificationSettings.DoesNotExist:
            raise Http404("Notification Settings do not exist")

# List Views


class ProfileInterestListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = InterestSerializer
    pagination_class = None

    def get_queryset(self):
        user_profile = UserProfile.objects.get(user=self.request.user)
        qs = user_profile.interests
        return qs


class ProfileLanguageListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserLanguageSerializer
    pagination_class = None

    def get_queryset(self):
        print(self.request.user)
        user_profile = UserProfile.objects.get(user=self.request.user)
        qs = UserLanguages.objects.filter(user_profile=user_profile.id)
        return qs


class ProfileLanguageUpdateView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, action, *args, **kwargs):
        new_language = request.data.get('new_language')
        classification = request.data.get('classification')
        try:
            try:
                language = Language.objects.get(title=new_language)
            except:
                language = Language.objects.get(title='Other')
            user_profile = UserProfile.objects.get(user=request.user)
            if action == 'remove':
                user_profile.languages.remove(language)
            else:
                user_profile.languages.add(language, through_defaults={
                    'classification': classification})

            return Response(LanguageSerializer(language).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProfileInterestUpdateView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, action, *args, **kwargs):
        new_interest = request.data.get('interest')
        print("New interest: ", new_interest)
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            try:
                interest = Interest.objects.get(title=new_interest)
            except:
                interest = Interest(title=new_interest)
                interest.save()
            if action == 'remove':
                user_profile.interests.remove(interest)
            else:
                user_profile.interests.add(interest)

            return Response(InterestSerializer(interest).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


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


class FollowerListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer
    pagination_class = None

    def get_queryset(self):
        user_profile = UserProfile.objects.get(user__id=self.request.user.id)
        qs = user_profile.followers.all()
        return qs


class FollowingListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer
    pagination_class = None

    def get_queryset(self):
        user_profile = UserProfile.objects.get(user__id=self.request.user.id)
        qs = user_profile.following.all()
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


""" Misc Views"""


class TagListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = TagSerializer
    pagination_class = None
    queryset = Tag.objects.all()


class SearchView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, format=None):
        term = request.query_params.get('term')
        try:
            posts = Post.objects.filter(content__icontains=term)
            people = UserProfile.objects.filter(Q(user__first_name__startswith=term) | Q(
                user__last_name__startswith=term) | Q(user__username__startswith=term))
            questions = Question.objects.filter(
                Q(content__icontains=term) | Q(tags__title__contains=term))

            return Response({'posts': PostSerializer(posts, many=True).data, 'people': UserProfileSerializer(people, many=True).data, 'questions': QuestionSerializer(questions, many=True).data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


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


class QuizDetailView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = QuizSerializer

    def get(self, request, format=None):
        level = request.query_params.get('level')
        language = request.query_params.get('language')
        try:
            quiz = Quiz.objects.get(level=level, language__title=language)
            return Response(QuizSerializer(quiz).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# API Views

class QuizCompletionView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        quiz_id = request.data.get('quiz_id')
        vocabulary_answers = request.data.get('vocabulary_answers')
        translation_answers = request.data.get('translation_answers')
        try:
            quiz = Quiz.objects.get(id=quiz_id)
            mcqs = quiz.mcqs.all()
            translations = quiz.translations.all()
            vocab_result = 0
            translation_result = 0
            print("Fist here")
            # The answers should be according to sequence of questions in the quiz for this to work
            for index, mcq in enumerate(mcqs):
                if vocabulary_answers[index] == mcq.answer:
                    vocab_result += 1
            print("Done with vocab")
            for index, translation in enumerate(translations):
                ratio = SequenceMatcher(
                    None, translation_answers[index], translation.answer).ratio()
                if ratio > 0.70:
                    translation_result += 1
            print("Done with translation")

            result = Result(quiz=quiz, user=request.user, vocabulary=vocab_result,
                            translation=translation_result, level=quiz.level)
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


class PostListView(APIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer
    pagination_class = None

    def get(self, request):
        posts = []
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            following = user_profile.following.all()
            for followee in following:
                followee_posts = followee.posts.all()
                print("Followee Posts: ", followee_posts)
                posts.append(PostSerializer(followee_posts, many=True).data)
            return Response(posts, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserPostListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer
    pagination_class = None

    def get_queryset(self):
        username = self.kwargs.get('username')
        print("Username", username)
        qs = Post.objects.filter(user__username=username)
        return qs


class PostDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostSerializer

    def get_object(self):
        try:
            post = Post.objects.get(id=self.kwargs.get('id'))
            return post
        except Post.DoesNotExist:
            raise Http404("Post does not exist")

# Create Views


class PostCreateView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        content = request.data.get('content')
        image = request.data.get('image')
        print("Content: ", content)
        try:
            post = Post(content=content, user=request.user)
            post.save()
            post_image = PostImage(image=image, post=post)
            post_image.save()
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
                comment_author = User.objects.get(id=comment.user.id)
                notification = Notification(
                    user=comment_author, from_user=request.user, notification_type='L', comment=comment)
                notification.save()
            else:
                post = Post.objects.get(id=id)
                post.likes.add(user)
                post_author = User.objects.get(id=post.user.id)
                notification = Notification(
                    user=post_author, from_user=request.user, notification_type='L', post=post)

                notification.save()
            return Response({'Message': 'Liked!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_200_OK)


class UnLikeView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, like_type, id, *args, **kwargs):
        try:
            user = User.objects.get(id=request.user.id)
            if like_type == 'comment':
                comment = Comment.objects.get(id=id)
                comment.likes.remove(user)
            else:
                post = Post.objects.get(id=id)
                post.likes.remove(user)
            return Response({'Message': 'UnLiked!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_200_OK)


class PostShareView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        shared_content = request.data.get('shared_content')
        post_id = request.data.get('post_id')
        try:
            original_post = Post.objects.get(id=post_id)
            post = Post(shared_content=shared_content, sharing_user=request.user,
                        shared=True, content=original_post.content, user=original_post.user)
            for image in original_post.images.all():
                post.images.add(image)
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


class VoteView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, vote_type, id, *args, **kwargs):
        try:
            user = User.objects.get(id=request.user.id)
            if vote_type == 'question':
                question = Question.objects.get(id=id)
                question.votes.add(user)
                question_author = User.objects.get(id=question.user.id)
                notification = Notification(
                    user=question_athor, from_user=request.user, notification_type='V', question=question)

                notification.save()
            else:
                answer = Answer.objects.get(id=id)
                answer.votes.add(user)
                answer_author = User.objects.get(id=answer.user.id)
                notification = Notification(
                    user=answer_author, from_user=request.user, notification_type='V', answer=answer)

                notification.save()
            return Response({'Message': 'Voted!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_200_OK)


class UnVoteView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, vote_type, id, *args, **kwargs):
        try:
            user = User.objects.get(id=request.user.id)
            if vote_type == 'question':
                question = Question.objects.get(id=id)
                question.votes.remove(user)
            else:
                post = Answer.objects.get(id=id)
                post.votes.remove(user)
            return Response({'Message': 'UnVoted!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_200_OK)

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

class FollowView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            user_profile = UserProfile.objects.get(user__id=request.user.id)
            user_profile.following.add(user)
            notification = Notification(
                user=user, from_user=request.user, notification_type='F')

            notification.save()
            return Response({'Message': 'Followed!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class UnfollowView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            user_profile = UserProfile.objects.get(user__id=request.user.id)
            user_profile.following.remove(user)
            return Response({'Message': 'Unfollowed!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class CheckFollowView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, fomat=None):
        user_id = request.query_params.get('user_id')
        print("User id: ", user_id)
        try:
            user_profile = UserProfile.objects.get(user_id=request.user.id)
            user_profile.following.get(id=user_id)
            return Response({'followed': True}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'followed': False}, status=status.HTTP_200_OK)


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


""" Voice Channels """


class VoiceChannelCreateView(CreateAPIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        users = request.data.get('users')
        language = request.data.get('language')
        room_id = request.data.get('room_id')
        topic = request.data.get('topic')
        print("Users: ", users)
        try:
            language_obj = Language.objects.get(title=language)
            voice_channel = VoiceChannel(
                language=language_obj, room_id=room_id, topic=topic, user=request.user)
            voice_channel.save()
            url = f'/channels/active/{room_id}'
            this_user = User.objects.get(id=request.user.id)
            for user in users:
                voice_channel.users.add(user['pk'])
                user_obj = User.objects.get(id=user['pk'])
                notification = Notification(
                    user=user_obj, from_user=this_user, notification_type='T', url=url)
                notification.save()
            return Response(VoiceChannelSerializer(voice_channel).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class VoiceChannelDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = VoiceChannelSerializer

    def get_object(self):
        try:
            voice_channel = VoiceChannel.objects.get(
                room_id=self.kwargs.get('id'))
            return voice_channel
        except VoiceChannel.DoesNotExist:
            raise Http404("Voice Channel does not exist")


class VoiceChannelListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = VoiceChannelSerializer
    queryset = VoiceChannel.objects.all()


class VoiceChannelUpdateView(UpdateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = VoiceChannelCreationSerializer
    queryset = VoiceChannel.objects.all()


""" Chat related views and methods """


def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:10]


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            contact = get_user_contact(username)
            queryset = contact.chats.all()
        return queryset


class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (AllowAny, )


class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated, )


class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated, )


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated, )


""" Recommendation Views """


class UserRecommendationView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user__pk=request.user.id)
            interests = user_profile.interests.all()
            languages = UserLanguages.objects.filter(
                user_profile=user_profile.id, classification="Target")
            user_list = []
            for language in languages:
                recommended_profiles = UserProfile.objects.filter(
                    languages__title=language.language.title)
                user_list.append(UserProfileSerializer(
                    recommended_profiles, many=True).data)

            for interest in interests:
                recommended_profiles = UserProfile.objects.filter(
                    interests__title=interest.title)
                user_list.append(UserProfileSerializer(
                    recommended_profiles, many=True).data)

            return Response(user_list, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)


class PostRecommendationView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user__pk=request.user.id)
            languages = UserLanguages.objects.filter(
                user_profile=user_profile.id, classification="Target")
            posts = []
            for language in languages:
                recommended_posts = Post.objects.filter(
                    language__title=language.language.title)
                posts.append(PostSerializer(recommended_posts, many=True).data)

            return Response(posts, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_404_NOT_FOUND)
