from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# Model - created_at, title, desc, updated_at, completed_at, user

class Todos(models.Model):
    title = models.CharField(null=True, blank=True, max_length=20)
    desc = models.TextField(null=True,
                            blank=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, )
    completed = models.BooleanField(default=False, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
