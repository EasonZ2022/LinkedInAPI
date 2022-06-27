from django.urls import path
from .views import UserDetailAPIView, RegisterUserAPIView, DeleteUserAPIView, UserSavedProfileAPIView
urlpatterns = [
    path('register',RegisterUserAPIView.as_view()),         # POST, send with register information
    path("delete",DeleteUserAPIView.as_view()),             # DELETE, need a Token
    path('my-profiles',UserSavedProfileAPIView.as_view()),  # GET, need a Token, get user's saved profiles
    path("get-details",UserDetailAPIView.as_view()),        # GET, need a Token
]