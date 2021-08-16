from polyglotten.api.serializers import ChatSerializer
from polyglotten.models import Chat, Contact
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from rest_framework import permissions
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()


def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:10]


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)


def get_current_chat(chatId):
    return get_object_or_404(Chat, id=chatId)


User = get_user_model()


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

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
    permission_classes = (permissions.AllowAny, )


class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )
