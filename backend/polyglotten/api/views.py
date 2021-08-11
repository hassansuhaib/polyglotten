from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.generics import DestroyAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.pagination import PageNumberPagination

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


""" Message Related Views """


class MessageListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = MessageSerializer
    pagination_class = None

    def get_queryset(self):
        qs = Message.objects.all()
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


class PostCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = PostCreateSerializer
    queryset = Post.objects.all()


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


class ShareView(APIView):
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


class CommentEditView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        edited_content = request.data.get('edited_content')
        comment_id = request.data.get('comment_id')
        try:
            comment = Comment.objects.get(id=comment_id)
            comment.content = edited_content
            comment.edited = True
            comment.save()
            return Response(PostSerializer(comment).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


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


class QuestionCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = QuestionCreateSerializer
    queryset = Question.objects.all()


class AnswerCreateView(CreateAPIView):
    permission_classes = (AllowAny, )
    serializer_class = QuestionCreateSerializer
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
            return Response({'Error': str(e)}, status=status.HTTP_200_OK)
