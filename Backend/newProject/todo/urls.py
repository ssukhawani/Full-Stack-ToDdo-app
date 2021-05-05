from django.urls import path
from . import views



urlpatterns = [
    path('users/',views.getAllUsers, name="get-all-users"),
    path('users/login', views.loginUser, name="get-all-users"),
    path('users/register',views.registerUser, name="get-all-users"),
    path('users/todos', views.fetchAllTodos, name="get-todos-id"),
    path('users/todos/<int:id>', views.fetchOneTodo, name="get-one-todo"),
    path('users/todos/create', views.createTodos, name="create-todo")
]
