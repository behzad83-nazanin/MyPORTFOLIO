from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.projects_page, name='projects_page'),
]