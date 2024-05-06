from django.urls import path
from .views import UserProfileUpdateView
from .views import UserListView

urlpatterns = [
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('admin/users/', UserListView.as_view(), name='admin-users-list'),
]