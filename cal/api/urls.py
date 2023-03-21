from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views
# Create your api urls here.

urlpatterns = [
    path('auth/', obtain_auth_token, name='auth'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('', views.ListAvailableApiView.as_view(), name='api'),

    path('calendars/', views.CalendarListCreateAPIView.as_view(), name='calendars'),
    path('calendars/<int:pk>/', views.CalendarDetailAPIView.as_view(), name='calendars-detail'),
    path('calendars/<int:pk>/update', views.CalendarUpdateAPIView.as_view(), name='calendars-update'),
    path('calendars/<int:pk>/delete', views.CalendarDeleteAPIView.as_view(), name='calendars-delete'),
    path('events/', views.EventListCreateAPIView.as_view(), name='events'),
    path('events/<int:pk>/', views.EventDetailAPIView.as_view(), name='events-detail'),
    path('events/<int:pk>/update', views.EventUpdateAPIView.as_view(), name='events-update'),
    path('events/<int:pk>/delete', views.EventDeleteAPIView.as_view(), name='events-delete'),
]