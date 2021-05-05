from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from .models import Todos



class UserSerializers(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(required=False)
    username = serializers.CharField(required=True, validators=[UniqueValidator(
        queryset=User.objects.all(), message="Username already exist")])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(
        queryset=User.objects.all(), message="Email already exist")])
    password = serializers.CharField(min_length=6, required=True, write_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email','first_name','password','isAdmin']

    def get_first_name(self, obj):
        return obj.username.capitalize()

    def get_isAdmin(self, obj):
        return obj.is_staff


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = ["title", "desc", "created_at", "updated_at", "completed", "user"]



