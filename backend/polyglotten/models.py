from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.conf import settings


GENDER_SELECTION = [
    ('M', 'Male'),
    ('F', 'Female'),
    ('NS', 'Not Specified'),
]

LANGUAGE_SELECTION = [
    ('N', 'Native'),
    ('T', 'Target')
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
        return f'{self.title} {self.classification}'


VOTE_TYPES = [('Q', 'Question'), ('A', 'Answer')]


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    interests = models.ManyToManyField(
        Interest, related_name='interests', blank=True)
    languages = models.ManyToManyField(
        Language, related_name='language', through='UserLanguages', blank=True)
    friends = models.ManyToManyField(User, related_name='friends', blank=True)

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
    shared_at = models.DateTimeField(blank=True, null=True)
    sharing_user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ['-created_at', '-shared_at']

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
        return self.product.title


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
        if user_1 and user_2 and user_3 and user_4:
            self.full = True
        else:
            self.full = False
        return super(VoiceChannel, self).save(*args, **kwargs)

    def __str__(self):
        return self.topid


def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        userprofile = UserProfile.objects.create(user=instance)


post_save.connect(userprofile_receiver, sender=settings.AUTH_USER_MODEL)
