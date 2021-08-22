from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.conf import settings
import datetime


GENDER_SELECTION = [
    ('M', 'Male'),
    ('F', 'Female'),
    ('NS', 'Not Specified'),
]

LANGUAGE_SELECTION = [
    ('Native', 'Native'),
    ('Target', 'Target'),
]

NOTIFICATION_TYPES = [
    ('C', 'Comment'),
    ('S', 'Share'),
    ('L', 'Like'),
    ('V', 'Vote')
]

QUIZ_LEVELS = [
    ('B', 'Beginner'),
    ('I', 'Intermediate'),
    ('A', 'Advanced'),
]


class User(AbstractUser):
    gender = models.CharField(max_length=20, choices=GENDER_SELECTION)


class Badge(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Interest(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Language(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.title}'


class NotificationSettings(models.Model):
    every = models.BooleanField(default=True)
    posts = models.BooleanField(default=True)
    upvotes = models.BooleanField(default=True)
    recommended = models.BooleanField(default=True)

    def __str__(self):
        return f'All: {self.every}, Post: {self.posts}, Friend Request: {self.upvotes}, Recommended: {self.recommended}'


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    about = models.CharField(max_length=250, null=True, blank=True)
    interests = models.ManyToManyField(
        Interest, related_name='user_interests', blank=True)
    languages = models.ManyToManyField(
        Language, related_name='user_languages', through='UserLanguages', blank=True)
    followers = models.ManyToManyField(
        User, related_name='followers', blank=True)
    followees = models.ManyToManyField(
        User, related_name="followees", blank=True)
    cover_photo = models.FileField(
        upload_to='user_profile/', null=True, blank=True)
    profile_photo = models.FileField(
        upload_to='user_profile/', null=True, blank=True)
    notification_settings = models.OneToOneField(
        NotificationSettings, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        notification = NotificationSettings()
        notification.save()
        self.notification_settings = notification

        return super(UserProfile, self).save(*args, **kwargs)

    def __str__(self):
        return self.user.username


class UserLanguages(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    classification = models.CharField(
        max_length=20, choices=LANGUAGE_SELECTION)


class Tag(models.Model):
    title = models.CharField(max_length=250)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    edited = models.BooleanField(default=False)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)
    tags = models.ManyToManyField(Tag, related_name='tags', blank=True)
    mentions = models.ManyToManyField(
        User, related_name='mentions', blank=True)

    # Fields related to share functionality
    shared = models.BooleanField(default=False)
    shared_content = models.TextField(blank=True, null=True)
    shared_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    sharing_user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ['-created_at', '-shared_at']

    def number_of_likes(self):
        return self.likes.count()

    def number_of_comments(self):
        return self.comments.count()

    def create_tags(self):
        for word in self.content.split():
            if (word[0] == '#'):
                tag = Tag.objects.get(title=word[1:])
                if tag:
                    self.tags.add(tag.pk)
                else:
                    tag = Tag(title=word[1:])
                    tag.save()
                    self.tags.add(tag.pk)

        if self.shared_content:
            for word in self.shared_content.split():
                if (word[0] == '#'):
                    tag = Tag.objects.get(title=word[1:])
                    if tag:
                        self.tags.add(tag.pk)
                    else:
                        tag = Tag(title=word[1:])
                        tag.save()
                        self.tags.add(tag.pk)

    def create_mentions(self):
        for word in self.content.split():
            if (word[0] == '@'):
                user = User.objects.get(username=word[1:])
                if mention:
                    self.mentions.add(user.pk)

        if self.shared_content:
            for word in self.shared_content.split():
                if (word[0] == '@'):
                    user = User.objects.get(username=word[1:])
                    if mention:
                        self.mentions.add(user.pk)

    def save(self, *args, **kwargs):
        self.create_tags()
        self.create_mentions()
        return super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.content} by {self.user.username}'


class PostImage(models.Model):
    post = models.ForeignKey(
        Post, default=None, on_delete=models.CASCADE, related_name='images')
    image = models.FileField(upload_to='post_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post.content


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    edited = models.BooleanField(default=False)
    likes = models.ManyToManyField(
        User, related_name='comment_likes', blank=True)
    tags = models.ManyToManyField(Tag, related_name='comment_tags', blank=True)
    mentions = models.ManyToManyField(
        User, related_name='comment_mentions', blank=True)

    def number_of_likes(self):
        return self.likes.count()

    def create_tags(self):
        for word in self.content.split():
            if (word[0] == '#'):
                tag = Tag.objects.get(title=word[1:])
                if tag:
                    self.tags.add(tag.pk)
                else:
                    tag = Tag(title=word[1:])
                    tag.save()
                    self.tags.add(tag.pk)

    def create_mentions(self):
        for word in self.content.split():
            if (word[0] == '@'):
                user = User.objects.get(username=word[1:])
                if mention:
                    self.mentions.add(user.pk)

    def save(self, *args, **kwargs):
        self.create_tags()
        self.create_mentions()
        return super(Comment, self).save(*args, **kwargs)

    def __str__(self):
        return self.content


class Question(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='questions')
    created_at = models.DateTimeField(auto_now=True)
    edited = models.BooleanField(default=False)
    votes = models.ManyToManyField(
        User, related_name='question_votes', blank=True)
    tags = models.ManyToManyField(
        Tag, related_name='question_tags', blank=True)

    def number_of_votes(self):
        return self.votes.count()

    def __str__(self):
        return f'{self.title} asked by {self.user.username}'

    class Meta:
        ordering = ['-created_at']


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='answers')
    content = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='answers')
    created_at = models.DateTimeField(auto_now=True)
    edited = models.BooleanField(default=False)
    votes = models.ManyToManyField(
        User, related_name='answer_votes', blank=True)

    def number_of_votes(self):
        return self.votes.count()

    def __str__(self):
        return f'{self.id} answered by {self.user.username}'


class VoiceChannel(models.Model):
    topic = models.CharField(max_length=250)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    full = models.BooleanField(default=False)
    user_1 = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_1')
    user_2 = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='user_2')
    user_3 = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='user_3')
    user_4 = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='user_4')

    def save(self, *args, **kwargs):
        # If it has all the users than of course it will be full
        if user_1 and user_2 and user_3 and user_4:
            self.full = True
        else:
            self.full = False
        return super(VoiceChannel, self).save(*args, **kwargs)

    def __str__(self):
        return self.topic


class Contact(models.Model):
    user = models.ForeignKey(
        User, related_name='friends', on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.username


class Message(models.Model):
    content = models.TextField()
    # image = models.FileField(
    #     upload_to='message_images/', null=True, blank=True)
    edited = models.BooleanField(default=False)
    edited_content = models.TextField(null=True, blank=True)
    contact = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name='contact')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sent by {self.contact.user.username}"

    def last_10_messages(self):
        return Message.objects.order_by('-timestamp').all()[:10]


class Chat(models.Model):
    participants = models.ManyToManyField(
        Contact, related_name='chats', blank=True)
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return "{}".format(self.pk)


class Quiz(models.Model):
    level = models.CharField(max_length=10, choices=QUIZ_LEVELS)
    language = models.ForeignKey(
        Language, on_delete=models.CASCADE, related_name="quizzes")
    time = models.TimeField(default=datetime.time(0, 20, 0))

    class Meta:
        verbose_name_plural = 'Quizes'

    def __str__(self):
        return f"Level: {self.level} and Time: {self.time}"


class MCQ(models.Model):
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, related_name='mcqs')
    word = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    answer = models.CharField(max_length=100)
    choice_1 = models.CharField(max_length=100)
    choice_2 = models.CharField(max_length=100)
    choice_3 = models.CharField(max_length=100)
    choice_4 = models.CharField(max_length=100)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.word


class Translation(models.Model):
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, related_name='translations')
    sentence = models.CharField(max_length=300)
    answer = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.sentence


class Result(models.Model):
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, related_name='results')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='results')
    vocabulary = models.IntegerField()
    translation = models.IntegerField()
    passed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    level = models.CharField(max_length=50)
    language = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        if self.vocabulary > 6 and self.translation > 6:
            self.passed = True
        if self.quiz.level == 'B':
            self.level = 'Beginner'
        elif self.quiz.level == 'I':
            self.level = 'Intermediate'
        else:
            self.level = 'Advanced'
        self.language = self.quiz.language.title

        return super(Result, self).save(*args, **kwargs)

    def __str__(self):
        return f"Vocabulary: {self.vocabulary} Translation: {self.translation} taken on {self.created_at}"


class Notification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications")
    created_at = models.DateTimeField(auto_now=True)
    content = models.CharField(max_length=250)
    read = models.BooleanField(default=False)
    notification_type = models.CharField(
        max_length=5, choices=NOTIFICATION_TYPES)
    from_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="from_user")
    post = models.ForeignKey(Post, on_delete=models.CASCADE,
                             related_name='post_notification', null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE,
                                related_name='comment_notification', null=True, blank=True)
    url = models.CharField(max_length=100, null=True, blank=True)
    question = models.ForeignKey(
        Question, related_name="question_notification", on_delete=models.CASCADE)
    answer = models.ForeignKey(
        Answer, related_name="answer_notification", on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if notification_type == 'L':
            if self.post:
                self.url = f'post/{self.post.id}'
                self.content = f'{self.from_user.first_name} liked your post'
            else:
                self.url = f'post/{self.post.id}'
                self.content = f'{self.from_user.first_name} liked your comment'
        elif notification_type == 'V':
            if self.question:
                self.url = f'question/{self.question.id}'
                self.content = f'{self.from_user.first_name} upvoted your question'
            else:
                self.url = f'question/{self.answer.question.id}'
                self.content = f'{self.from_user.first_name} upvoted your answer'
        elif self.notification_type == 'C':
            self.url = f'post/{self.post.id}'
            self.content = f'{self.from_user.first_name} commented on your post'
        elif self.notification_type == 'S':
            self.url = f'post/{self.post.id}'
            self.content = f'{self.from_user.first_name} shared your post'

        return super(Notification, self).save(*args, **kwargs)

    def __str__(self):
        return self.content


def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        userprofile = UserProfile.objects.create(user=instance)


post_save.connect(userprofile_receiver, sender=settings.AUTH_USER_MODEL)
