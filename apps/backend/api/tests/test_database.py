"""PostgreSQL integration test: no business tables or synthetic data.""" 

import pytest
from django.db import connection


@pytest.mark.django_db
def test_builtin_migrations_use_postgresql():
    assert connection.vendor == "postgresql"
    with connection.cursor() as cursor:
        cursor.execute("SELECT count(*) FROM django_migrations WHERE app = 'contenttypes'")
        assert cursor.fetchone()[0] >= 1
