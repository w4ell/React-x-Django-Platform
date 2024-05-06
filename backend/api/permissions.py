from rest_framework.permissions import BasePermission


class IsAdminCheck(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is an admin
        return request.user and request.user.is_admin
