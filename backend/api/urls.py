from django.urls import path
from .views import UserProfileUpdateView, UserListView, AdminUserDetail, AdminUserSetUserAdmin, AdminUserDeleteView

urlpatterns = [
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('admin/users/', UserListView.as_view(), name='admin-users-list'),
    path('admin/user/<int:pk>/', AdminUserDetail.as_view(), name='admin-user-detail'),
    path('admin/user/<int:pk>/set-admin/', AdminUserSetUserAdmin.as_view(), name='admin-set-admin'),
    path('admin/user/<int:pk>/delete/', AdminUserDeleteView.as_view(), name='admin-delete-user'),
]