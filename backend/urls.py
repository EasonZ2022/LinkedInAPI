"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from saveprofile import views
from rest_framework.authtoken.views import obtain_auth_token


router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'profiles', views.ProfileView, 'profile')
# router.register(r'experiences', views.ExperienceView, 'experience')
router.register(r'skills', views.SkillView, 'skill')

urlpatterns = [
    path('admin/', admin.site.urls),
    # api path:
    path('api/', include(router.urls)),
    path('', include('saveprofile.urls')),
    path('api-token-auth', obtain_auth_token) # POST, get the Token by sending login information

]