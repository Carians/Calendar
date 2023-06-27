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

class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        # fields = [
        #     'username',
        #     'email',
        #     'password',
        #     'first_name',
        #     'last_name'
        # ]
        fields = '__all__'
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True,
                'style': {
                    'input_type': 'password'
                }
            }
        }


