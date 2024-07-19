from rest_framework import serializers
from django.contrib.auth.models import User
from main.models import Calendar, Event

class BaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'

class EventSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Event

    def validate_calendar(self, value):
        user = self.context['request'].user
        if value.user != user:
            raise serializers.ValidationError('You do not have permission to assign this calendar')
        return value

class CalendarSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Calendar

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True,
                'style': {'input_type': 'password'}
            }
        }

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})
    new_password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'})

    extra_kwargs = {
        'current_password': {
            'write_only': True,
            'required': True,
            'style': {'input_type': 'password'}
        },
        'new_password': {
            'write_only': True,
            'required': True,
            'style': {'input_type': 'password'}
        }
    }

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect')
        return value

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters long')
        return value