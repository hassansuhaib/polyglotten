from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import GENDER_SELECTION, User


class CustomLoginSerializer(LoginSerializer):

    class Meta:
        model = User,
        fields = ('username', 'password')


class CustomRegisterSerializer(RegisterSerializer):
    gender = serializers.ChoiceField(choices=GENDER_SELECTION)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.gender = self.data.get('gender')
        user.save()
        return user

# To make some fields unchangeable after registration


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'pk',
            'email',
            'username',
            'gender',
        )
        read_only_fields = ('pk', 'email',)
