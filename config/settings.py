"""
Django settings for config project.
"""

from pathlib import Path
from django.utils.translation import gettext_lazy as _

# مسیر پایه پروژه
BASE_DIR = Path(__file__).resolve().parent.parent

# ==========================================
# امنیت (برای توسعه - بعداً برای تولید تغییر بدید)
# ==========================================
SECRET_KEY = 'django-insecure-b_an&zb_$zmn)&#9_c4!70z$&(gl!3!_^zt8hulh+xwa9)2v^u'
DEBUG = True
ALLOWED_HOSTS = []  # برای تولید: ['yourdomain.com', 'www.yourdomain.com']

# ==========================================
# اپلیکیشن‌های نصب شده
# ==========================================
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'core',
    'portfolio',
    'projects',
]

# ==========================================
# میان‌افزارها
# ==========================================
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',  # برای تغییر زبان
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ==========================================
# تنظیمات URL و قالب‌ها
# ==========================================
ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # اگر قالب‌ها توی پوشه جدا هست، مسیر رو اضافه کنید
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# ==========================================
# دیتابیس
# ==========================================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ==========================================
# اعتبارسنجی رمز عبور
# ==========================================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ==========================================
# زبان و زمان (فارسی)
# ==========================================
LANGUAGE_CODE = 'fa-ir'
TIME_ZONE = 'Asia/Tehran'
USE_I18N = True
USE_TZ = True

# زبان‌های پشتیبانی شده
LANGUAGES = [
    ('en', _('English')),
    ('fa', _('فارسی')),
]

# مسیر فایل‌های ترجمه
LOCALE_PATHS = [
    BASE_DIR / 'locale',
]

# ==========================================
# فایل‌های استاتیک و مدیا
# ==========================================
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',  # پوشه استاتیک شما
]
STATIC_ROOT = BASE_DIR / 'staticfiles'  # برای جمع‌آوری در تولید

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'  # برای فایل‌های آپلودی

# ==========================================
# تنظیمات پیش‌فرض
# ==========================================
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'