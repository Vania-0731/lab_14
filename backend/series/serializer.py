from rest_framework import serializers
from .models import Serie, Category
from django.contrib.auth.models import User

class SerieSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Serie
        fields = ('id', 'name', 'release_date', 'rating', 'category', 'image')


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'description')

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']