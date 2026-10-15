#!/usr/bin/env python3
"""Django administrative entry point for the Cuebik Core API scaffold."""

import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cuebik_api.settings")
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
