from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .serializers import UserSerializers
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    serializers = UserSerializers(users, many=True)
    return Response(data=serializers.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def loginUser(request):
    try:
        data = request.data
        password = data["password"]
        username = data["username"]
        userData = User.objects.get(username=username)

        if userData.check_password(password):
            token, _ = Token.objects.get_or_create(user_id=userData.id)
            user = UserSerializers(userData)

            return Response(data={'token': token.key, "user":user.data}, status=status.HTTP_200_OK)
        else:
            message = {'detail': "User with this password doesn't exist"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)
    except:
        message = {'detail': "User with this Username doesn't exist"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def registerUser(request):
    try:
        serializer = UserSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.last()
            tokn, _ = Token.objects.get_or_create(user_id=user.id)
            serializers2 = UserSerializers(user)
            return Response(data={"token": tokn.key, "user": serializers2.data}, status=status.HTTP_201_CREATED)
    except:
        return Response(data=serializer.errors, status=400)
        
        
    




