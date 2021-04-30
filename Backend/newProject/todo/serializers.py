from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


class UserSerializers(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(
        queryset=User.objects.all())])
    password = serializers.CharField(min_length=6, required=True, write_only=True)
    # isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email','first_name','password']



