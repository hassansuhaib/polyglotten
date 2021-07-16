from .base import *

import environ

env = environ.Env()
environ.Env.read_env()

DEV_DIR = Path(__file__).resolve().parent.parent.parent.parent

ALLOWED_HOSTS += ['polyglotten.com', 'www.polyglotten.com']
DEBUG = False

WSGI_APPLICATION = 'project.wsgi.production.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env.str('MYSQL_NAME'),
        'USER': env.str('MYSQL_USER'),
        'PASSWORD': env.str('MYSQL_PASSWORD'),
        'HOST': 'localhost',
        'PORT': '3306'
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://polyglotten.com",
    "http://www.polyglotten.com",
    "https://polyglotten.com",
    "https://www.polyglotten.com",
]
