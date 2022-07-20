from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Profile

from rest_framework.permissions import AllowAny, IsAuthenticated 
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer, ProfileSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework import status

# Class based view to Get User Details using Token Authentication
# /get-details
class UserDetailAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,*args,**kwargs):
        user = User.objects.get(id=request.user.id)
        print("/get-details id:")
        print(request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Delete user account using Token Authentication
# /delete
class DeleteUserAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def delete(self,request,*args,**kwargs):
        id=request.user.id
        print("/delete id:")
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
    
# /my-profiles
class UserSavedProfileAPIView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,*args,**kwargs):
        id=request.user.id
        print("/my-profiles id:")
        print(id)
        print(request.data)
        if User.objects.filter(id=id).exists():
            profiles = User.objects.get(id=id).profile_set.all()
            print(profiles)
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"response": "User Doesn't Exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self,request,*args,**kwargs):
        print("/my-profiles id:")
        print(request.user.id)
        data = request.data
        data["owner"] = request.user.id      # Safety purpose, make sure the owner is current user
        print(data)
        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,*args,**kwargs):
        print("/my-profiles id:")
        print(request.user.id)
        ownerId = request.user.id
        targetId = request.data.get('id')
        if User.objects.filter(id=ownerId).exists():
            profiles = User.objects.get(id=ownerId).profile_set
            if profiles.filter(id=targetId).exists():
                profile = profiles.get(id=targetId)
                profile.delete()
                return Response({"response":"Profile Deleted"}, status=status.HTTP_200_OK)
        return Response(
            {"response": "User or Profile Doesn't Exists"}, status=status.HTTP_400_BAD_REQUEST)        

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
    
# class SkillView(viewsets.ModelViewSet):
#     serializer_class = SkillSerializer
#     queryset = Skill.objects.all()        