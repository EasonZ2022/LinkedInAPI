from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# class User(models.Model):
#     username = models.CharField(max_length=20, primary_key=True)
#     email = models.CharField(max_length=40)
#     password = models.CharField(max_length=200) 
#     # TODO: some fields should be not NULL
    
#     def __str__(self):
#         return self.username

class Profile(models.Model):
    fullname = models.CharField(max_length=100)
    # owner = models.ForeignKey(User, on_delete=models.CASCADE, to_field='username')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    # location = models.CharField(max_length=200)

    company1 = models.CharField(max_length=200, default=None, blank=True, null=True)
    title1 = models.CharField(max_length=200, default=None, blank=True, null=True)
    start_date1 = models.DateField(default=None, blank=True, null=True)
    end_date1 = models.DateField(default=None, blank=True, null=True)
    
    company2 = models.CharField(max_length=200, default=None, blank=True, null=True)
    title2 = models.CharField(max_length=200, default=None, blank=True, null=True)
    start_date2 = models.DateField(default=None, blank=True, null=True)
    end_date2 = models.DateField(default=None, blank=True, null=True)    
    
    company3 = models.CharField(max_length=200, default=None, blank=True, null=True)
    title3 = models.CharField(max_length=200, default=None, blank=True, null=True)
    start_date3 = models.DateField(default=None, blank=True, null=True)
    end_date3 = models.DateField(default=None, blank=True, null=True)

    def __str__(self):
        return self.fullname
    
# class Experience(models.Model):
#     company = models.CharField(max_length=200)
#     title = models.CharField(max_length=200)
#     start_date = models.DateField()
#     end_date = models.DateField()
#     e_owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    
#     def __str__(self):
#         return self.company+":"+self.title
    
class Skill(models.Model):
    name = models.CharField(max_length=200)
    s_owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name