from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('projects/', views.projects, name='projects'),
    path('contact/', views.contact, name='contact'),
    path('projects/all/', views.projects_page, name='projects_page'),
    path('newsletter/',views.newsletter, name='newsletter'),
]