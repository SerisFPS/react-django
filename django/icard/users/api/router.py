from rest_framework.routers import DefaultRouter
from users.api.views import UserApiViewSet

routerUser = DefaultRouter()

routerUser.register(
    prefix='users',
    basename='users',
    viewset=UserApiViewSet,
)
