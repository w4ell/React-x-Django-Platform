from django.urls import path
from .views import UserProfileUpdateView, UserListView, AdminUserDetail, AdminUserSetUserAdmin, AdminUserDeleteView, UserUploadFileView, UserDatabaseView, DashboardStats

urlpatterns = [
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('admin/users/', UserListView.as_view(), name='admin-users-list'),
    path('admin/user/<int:pk>/', AdminUserDetail.as_view(), name='admin-user-detail'),
    path('admin/user/<int:pk>/set-admin/', AdminUserSetUserAdmin.as_view(), name='admin-set-admin'),
    path('admin/user/<int:pk>/delete/', AdminUserDeleteView.as_view(), name='admin-delete-user'),
    path('admin/dashboard-stats/', DashboardStats.as_view(), name='dashboard-stats'),
    path('user/upload/', UserUploadFileView.as_view(), name='upload-file'),
    path('user/database/', UserDatabaseView.as_view(), name='database-chart'),

]