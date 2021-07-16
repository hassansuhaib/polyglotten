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
    classification = models.CharField(
        max_length=20, choices=LANGUAGE_SELECTION)

    def __str__(self):
        return f"{self.title} {self.classification}"

VOTE_TYPES = [('q', 'Question'), ('a', 'Answer')]


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    language = models.ForeignKey(
        Language, on_delete=models.CASCADE, related_name='profiles')

    def __str__(self):
        return self.user.username

class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votes')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='votes', null=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='votes', null=True)
    vote_type = models.CharField(max_length=10, choices=VOTE_TYPES)

    def __str__(self):
        return f"{self.user.username}"

class Question(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} asked by {self.user.username}"

class Answer(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='answers')
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} answered by {self.user.username}"



def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        userprofile = UserProfile.objects.create(user=instance)


post_save.connect(userprofile_receiver, sender=settings.AUTH_USER_MODEL)
