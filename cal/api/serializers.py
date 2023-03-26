from rest_framework import serializers
from main.models import Calendar, Event
from django.contrib.auth.models import User

class CalendarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calendar
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name'
        ]

