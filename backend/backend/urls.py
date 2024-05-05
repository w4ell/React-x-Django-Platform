from django.contrib import admin 
from django.urls import path, include

urlpatterns = [ #liste des url
    path('admin/', admin.site.urls), #acceder à l'interface d'administration
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/', include('api.urls'))
]

