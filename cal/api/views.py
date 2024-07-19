from django.contrib.auth import logout
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, serializers, status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .serializers import UserRegisterSerializer
from main.models import Calendar, Event
from .serializers import CalendarSerializer, EventSerializer, ChangePasswordSerializer
from .permissions import IsOwnerOrDenyAccess

# Create your views here.
class ListAvailableApiView(APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            'calendars': reverse('calendars', request=request),
            'events': reverse('events', request=request),
            'user': reverse('user-detail', request=request),
            'change_password': reverse('change-password', request=request),
            'register': reverse('register', request=request),
            'logout': reverse('logout', request=request),
            'auth': reverse('auth', request=request),
        })

class CalendarListCreateAPIView(generics.ListCreateAPIView):

    serializer_class = CalendarSerializer
    permission_classes = [
        IsOwnerOrDenyAccess,
        permissions.IsAuthenticated
    ]
    def get_queryset(self):
        return Calendar.objects.filter(user=self.request.user).order_by('date_created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class CalendarDetailAPIView(generics.RetrieveAPIView):

    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    permission_classes = [
        IsOwnerOrDenyAccess,
        permissions.IsAuthenticated
                          ]

    def get_queryset(self):
        return Calendar.objects.filter(user=self.request.user).order_by('date_created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class CalendarUpdateAPIView(generics.UpdateAPIView):

    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    permission_classes = [IsOwnerOrDenyAccess]

class CalendarDeleteAPIView(generics.DestroyAPIView):

    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    permission_classes = [IsOwnerOrDenyAccess]

class EventListCreateAPIView(generics.ListCreateAPIView):

    def get_queryset(self):
        calendar = self.request.query_params.get('calendar')
        if calendar:
            return Event.objects.filter(user=self.request.user, calendar=calendar)
        return Event.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if self.request.data['start_time'] > self.request.data['end_time']:
            raise serializers.ValidationError('Start time must be before end time')
        calendar = serializer.validated_data.get('calendar')
        # print(calendar.user, self.request.user)
        if calendar.user != self.request.user:
            raise serializers.ValidationError('You do not have permission to assign this calendar')
        serializer.save(user=self.request.user)

    # queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsOwnerOrDenyAccess, permissions.IsAuthenticated]

class EventDetailAPIView(generics.RetrieveAPIView):

    def get_queryset(self):
        return Event.objects.filter(user=self.request.user)

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsOwnerOrDenyAccess]

class EventUpdateAPIView(generics.UpdateAPIView):

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsOwnerOrDenyAccess]

class EventDeleteAPIView(generics.DestroyAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsOwnerOrDenyAccess]

class RegisterView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def perform_create(self, serializer):
        if not self.request.data['email']:
            raise serializers.ValidationError('Email is required')

        if not self.request.data['password']:
            raise serializers.ValidationError('Password is required')

        if not self.request.data['username']:
            raise serializers.ValidationError('Username is required')

        if not self.request.data['first_name']:
            raise serializers.ValidationError('First name is required')

        if not self.request.data['last_name']:
            raise serializers.ValidationError('Last name is required')

        serializer.save(password=make_password(self.request.data['password']))

# TODO: Add autoremove token on password change
# TODO: Add autoremove token on user delete
# TODO: Add autoremove token after 30 days of inactivity
class LogoutView(APIView):
        def get(self, request):
            try:
                request.user.auth_token.delete()
            except (AttributeError, ObjectDoesNotExist):
                pass

            logout(request)

            return Response({'success': ('Successfully logged out.')}, status=status.HTTP_200_OK)


class UserDetailAPIView(generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self):
        return self.request.user

class UserChangePasswordView(generics.GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user

        current_password = serializer.validated_data.get('current_password')
        new_password = serializer.validated_data.get('new_password')

        if not user.check_password(current_password):
            raise serializers.ValidationError('Current password is incorrect')

        user.set_password(new_password)
        user.save()

        token = Token.objects.get(user=user)
        token.delete()

        return Response({'success': 'Password changed successfully'}, status=status.HTTP_200_OK)