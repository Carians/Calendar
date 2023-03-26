from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import generics, permissions, serializers
from main.models import Calendar, Event
from .serializers import CalendarSerializer, EventSerializer
from .permissions import IsOwnerOrDenyAccess
from django.contrib.auth.models import User
from .serializers import UserSerializer

# Create your views here.
class ListAvailableApiView(APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            'calendars': reverse('calendars', request=request),
            'events': reverse('events', request=request),
        })

class CalendarListCreateAPIView(generics.ListCreateAPIView):

    def get_queryset(self):
        return Calendar.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    serializer_class = CalendarSerializer

class CalendarDetailAPIView(generics.RetrieveAPIView):

    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    permission_classes = [IsOwnerOrDenyAccess]

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
        return Event.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsOwnerOrDenyAccess]

class EventDetailAPIView(generics.RetrieveAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    ermission_classes = [IsOwnerOrDenyAccess]

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
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        if not self.request.data['email']:
            raise serializers.ValidationError('Email is required')

