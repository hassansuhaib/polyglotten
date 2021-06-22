from .base import *

ALLOWED_HOSTS += ['127.0.0.1']
DEBUG = True

WSGI_APPLICATION = 'project.wsgi.development.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'polyglotten',
        'USER': 'postgres',
        'PASSWORD': 'peanutjelly',
        'HOST': '127.0.0.1',
        'PORT': '5432'
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
