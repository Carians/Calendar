from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django_currentuser.middleware import get_current_authenticated_user

# Create your models here.

class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    date_created = models.DateTimeField(default=timezone.now, editable=False)
    date_modified = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    def __str__(self):
        return self.name

class Calendar(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField(editable=False, default=timezone.now)
    date_modified = models.DateTimeField(editable=False, auto_now=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, default=1, editable=False)
    events = models.ManyToManyField(Event, blank=True)
    def __str__(self):
        return self.name

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if not self.pk:
            self.user = get_current_authenticated_user()
        super().save(force_insert, force_update, using, update_fields)
