from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated 
from .models import Profile, Skill

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer, ProfileSerializer, SkillSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework import status

# Class based view to Get User Details using Token Authentication
class UserDetailAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    def get(self,request,*args,**kwargs):
        user = User.objects.get(id=request.user.id)
        print("id:")
        print(request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class DeleteUserAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    def delete(self,request,*args,**kwargs):
        id=request.user.id
        print("id:")
        print(id)
        if User.objects.filter(id=id).exists():
            user = User.objects.get(id=id)
            user.delete()
            return Response({"response":"User Deleted"}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"response": "User Doesn't Exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

# Class based view to register user
class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
class UserSavedProfileAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    def get(self,request,*args,**kwargs):
        id=request.user.id
        print("id:")
        print(id)
        if User.objects.filter(id=id).exists():
            profiles = User.objects.get(id=id).profile_set.all()
            print(profiles)
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"response": "User Doesn't Exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

#The below are all for test purpose, to see all users, profiles, skills
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # @action(methods=['get'], detail=True)
    # def get_my_profiles(self, request, pk=None):
    #     queryset = self.get_object().profile_set.all()
    #     print(queryset)
    #     # queryset = User.objects.get(username=pk).profile_set.all()
    #     serializer = ProfileSerializer(queryset, many=True)
    #     print(serializer)
    #     return Response(serializer.data)
    
    
class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()    
    
# class ExperienceView(viewsets.ModelViewSet):
#     serializer_class = ExperienceSerializer
#     queryset = Experience.objects.all()    
    
class SkillView(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    queryset = Skill.objects.all()        