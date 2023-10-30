from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView                # used by UserView class
from rest_framework.response import Response            # we need this for UserView
from users.models import User
from users.api.serializers import UserSerializer
from django.contrib.auth.hashers import make_password   # used by hash password class ( create and partial_update)

class UserApiViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # function to hash passwords
    def create(self, request, *args,**kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        password = request.data['password']
        if password:
            request.data['password'] = make_password(password)
        else:
            request.data['password'] = request.user.password
        return super().update(request, *args, **kwargs)


# class to allow users check their own information
class UserView(APIView):    # this end point return the current user session data
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        # return formatted user data
        return Response(serializer.data)