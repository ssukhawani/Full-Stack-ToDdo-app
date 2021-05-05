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
from .models import Todos
from .serializers import TodoSerializer


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
    password = request.data["password"]
    serializer = UserSerializers(data={**request.data, "password":make_password(password)})
    if serializer.is_valid():
        serializer.save()
        user = User.objects.last()
        tokn, _ = Token.objects.get_or_create(user_id=user.id)
        serializers2 = UserSerializers(user)
        return Response(data={"token": tokn.key, "user": serializers2.data}, status=status.HTTP_201_CREATED)
    else:
        return Response(data=serializer.errors, status=400)
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetchAllTodos(request):
    todos = Todos.objects.filter(user=request.user.id)
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createTodos(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors,status=400)
    return Response(serializer.data, status=201)


@api_view(['GET', "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def fetchOneTodo(request, id):
    if request.method == "GET" :
        todo = Todos.objects.get(user=request.user.id, id=id)
        serializer = TodoSerializer(todo)
        return Response(serializer.data, status=200)
    
    elif request.method == "PUT":
        todo = Todos.objects.get(user=request.user.id, id=id)
        serializer = TodoSerializer(data=request.data, instance=todo)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=400)
        return Response(serializer.data, status=200)

    elif request.method == "DELETE":
        todo = Todos.objects.get(user=request.user.id, id=id)
        todo.delete()
        return Response(data=None, status=204)









