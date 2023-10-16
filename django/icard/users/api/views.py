from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser

from users.models import User
from users.api.serializers import UserSerializer

# hash password
from django.contrib.auth.hashers import make_password

class UserApiViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # function to hash passwords
    def create(self, request, *args,**kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)