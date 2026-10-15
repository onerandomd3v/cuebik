"""Minimal Django settings for the Cuebik Core API scaffold.

The PostgreSQL connection is authoritative once domain models are introduced.
No customer accounts, product state, or approval rules exist in this scaffold.
"""

import os

from django.core.exceptions import ImproperlyConfigured


def required_environment(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise ImproperlyConfigured(f"{name} must be set in the API process environment")
    return value


DEBUG = os.environ.get("CUEBIK_DEBUG", "0") == "1"
SECRET_KEY = required_environment("CUEBIK_SECRET_KEY")
ALLOWED_HOSTS = [
    hostname.strip()
    for hostname in os.environ.get("CUEBIK_ALLOWED_HOSTS", "").split(",")
    if hostname.strip()
]
if not DEBUG and not ALLOWED_HOSTS:
    raise ImproperlyConfigured("CUEBIK_ALLOWED_HOSTS is required outside development")

ROOT_URLCONF = "cuebik_api.urls"
WSGI_APPLICATION = "cuebik_api.wsgi.application"
ASGI_APPLICATION = "cuebik_api.asgi.application"
INSTALLED_APPS = [
    "django.contrib.contenttypes",
]
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",
]
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "APP_DIRS": True,
        "DIRS": [],
        "OPTIONS": {},
    },
]
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": required_environment("POSTGRES_DB"),
        "USER": required_environment("POSTGRES_USER"),
        "PASSWORD": required_environment("POSTGRES_PASSWORD"),
        "HOST": required_environment("POSTGRES_HOST"),
        "PORT": required_environment("POSTGRES_PORT"),
        "CONN_MAX_AGE": 0,
    }
}
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
TIME_ZONE = "UTC"
USE_TZ = True
