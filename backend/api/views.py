from rest_framework.views import APIView #pour créer des vues API personnalisées(Get,Put..)
from rest_framework.response import Response #pour renvoyer des réponses HTTP à partir des vues API
from rest_framework import status, generics #generics fournit des vues API génériques préconstruites pour effectuer des opérations CRUD
from .serializers import UserProfileUpdateSerializer, UserSerializer
from .models import UserAccount
from .permissions import IsAdminCheck

class UserProfileUpdateView(APIView):
    def put(self, request):
        serializer = UserProfileUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(generics.ListAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminCheck]

class AdminUserDetail(generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminCheck]

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AdminUserSetUserAdmin(generics.UpdateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminCheck]

    def update(self, request, *args, **kwargs):
        user_id = kwargs.get('pk') 
        user = UserAccount.objects.get(id=user_id)
        user.is_admin = True
        user.save()

        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AdminUserDeleteView(generics.DestroyAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminCheck]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        