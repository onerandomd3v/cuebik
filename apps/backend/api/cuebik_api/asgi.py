"""ASGI entry point for the Core API."""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cuebik_api.settings")
application = get_asgi_application()
