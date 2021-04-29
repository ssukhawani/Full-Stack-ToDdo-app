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
            # serializer = UserSerializers(data=userData)
            # if serializer.is_valid():
            #     serializer.save()
            #     output = serializer.data
            #     output["token"] = token.key
            #     output = UserSerializers(data=output).data
            #     return Response(data=output, status=status.HTTP_200_OK)
            # else:
            #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(data={"token": token.key}, status=status.HTTP_200_OK)
        else:
            message = {'detail': "User with this password doesn't exist"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)
    except:
        message = {'detail': "User with this Username doesn't exist"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def registerUser(request):
    data = request.data
    User.objects.create(
        username=data["username"],
        email = data["email"],
        first_name = data["first_name"],
        password = make_password(data["password"])
    )
    user=User.objects.last()
    tokn,_ = Token.objects.get_or_create(user_id=user.id)
    serializers2=UserSerializers(user).data
    serializers2['token']=tokn.key
    return Response(data=serializers2,status=status.HTTP_201_CREATED)



