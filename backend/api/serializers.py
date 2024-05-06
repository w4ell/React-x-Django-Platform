from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.permissions import BasePermission
from .models import UserAccount


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'full_name', 'birth_date', 'is_admin')

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'full_name','birth_date', 'password')

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'full_name', 'birth_date')

class IsAdminCheck(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is an admin
        return request.user and request.user.is_admin
