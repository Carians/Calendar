from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    date_created = models.DateTimeField(default=timezone.now)
    date_modified = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    def __str__(self):
        return self.name

class Calendar(models.Model):
    name = models.CharField(max_length=200, unique=True, blank=False, null=False)
    description = models.TextField()
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    events = models.ManyToManyField(Event)
    def __str__(self):
        return self.name
