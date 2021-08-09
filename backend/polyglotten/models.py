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


class Ranking(models.Model):
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
        return f"{self.title} {self.classification}"


VOTE_TYPES = [('Q', 'Question'), ('A', 'Answer')]


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    interests = models.ManyToManyField(Interest, related_name="interests")
    languages = models.ManyToManyField(
        Language, related_name="languages", through="UserLanguages")

    def __str__(self):
        return self.user.username


class UserLanguages(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    classification = models.CharField(
        max_length=20, choices=LANGUAGE_SELECTION)


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="posts")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    edited = models.BooleanField(default=False)
    likes = models.ManyToManyField(User, related_name="likes")

    def number_of_likes(self):
        return self.likes.count()

    def __str__(self):
        return f"{self.content} by {self.user.username}"


class PostImage(models.Model):
    post = models.ForeignKey(
        Post, default=None, on_delete=models.CASCADE, related_name="images")
    image = models.FileField(upload_to='post_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.title


class Question(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='questions')
    created_at = models.DateTimeField(auto_now=True)
    votes = models.ManyToManyField(User, related_name="question_votes")

    def number_of_votes(self):
        return self.votes.count()

    def __str__(self):
        return f"{self.title} asked by {self.user.username}"


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers")
    content = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='answers')
    created_at = models.DateTimeField(auto_now=True)
    votes = models.ManyToManyField(User, related_name="answer_votes")

    def number_of_votes(self):
        return self.votes.count()

    def __str__(self):
        return f"{self.id} answered by {self.user.username}"


def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        userprofile = UserProfile.objects.create(user=instance)


post_save.connect(userprofile_receiver, sender=settings.AUTH_USER_MODEL)
