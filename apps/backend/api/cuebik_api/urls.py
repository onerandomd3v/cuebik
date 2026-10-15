"""Only the versioned health API is exposed by this scaffold."""

from django.urls import path

from .api import api

urlpatterns = [
    path("api/v1/", api.urls),
]
