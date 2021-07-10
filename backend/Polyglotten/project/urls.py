from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth-api/', include('dj_rest_auth.urls')),
    path('auth-api/registration/', include('dj_rest_auth.registration.urls')),

]
