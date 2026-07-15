from django.shortcuts import render,redirect
from portfolio.models import Project, ShowcaseProject
from portfolio.models import ProjectRequest
from portfolio.models import Newsletter
from django.contrib import messages
from django.http import JsonResponse
from portfolio.models import Skill




DEFAULT_SKILLS = [

    {
        'name': 'Python',
        'percentage': 95,
    },

    {
        'name': 'Django',
        'percentage': 90,
    },

    {
        'name': 'DRF',
        'percentage': 85,
    },

    {
        'name': 'JavaScript',
        'percentage': 85,
    },

    {
        'name': 'HTML',
        'percentage': 95,
    },

    {
        'name': 'CSS',
        'percentage': 90,
    },

    {
        'name': 'Bootstrap',
        'percentage': 90,
    },

]

def prepare_projects(projects):
    for project in projects:
        project.tech_list = [
            tech.strip()
            for tech in project.technologies.split(',')
            if tech.strip()
        ]
    return projects



def home(request):

    context = {}

    return render(
        request,
        'core/home.html',
        context
    )
def about(request):

    custom_skills = Skill.objects.all()

    return render(
        request,
        'core/about.html',
        {
            'custom_skills': custom_skills
        }
    )


def projects(request):

    projects = Project.objects.filter(
        featured=True
    )[:3]

    projects = prepare_projects(projects)

    context = {
        'projects': projects
    }

    return render(
        request,
        'core/projects.html',
        context
    )


def projects_page(request):

    projects = ShowcaseProject.objects.all()

    projects = prepare_projects(projects)

    context = {
        'projects': projects
    }

    return render(
        request,
        'core/components/projects_page.html',
        context
    )


def contact(request):

    if request.method == 'POST':

        ProjectRequest.objects.create(
            name=request.POST.get('name'),
            email=request.POST.get('email'),
            phone=request.POST.get('phone'),
            project_type=request.POST.get('project_type'),
            budget=request.POST.get('budget'),
            timeline=request.POST.get('timeline'),
            description=request.POST.get('description'),
        )

        return redirect('/contact/?success=1')

    success = request.GET.get('success')

    return render(
        request,
        'core/contact.html',
        {
            'success': success
        }
    )

def contact(request):

    if request.method == 'POST':

        ProjectRequest.objects.create(

            name=request.POST.get('name'),
            email=request.POST.get('email'),
            phone=request.POST.get('phone'),
            project_type=request.POST.get('project_type'),
            budget=request.POST.get('budget'),
            timeline=request.POST.get('timeline'),
            description=request.POST.get('description'),
        )

        return render(
            request,
            'core/contact.html',
            {
                'success': True
            }
        )

    return render(
        request,
        'core/contact.html'
    )

def newsletter(request):

    if request.method == 'POST':

        email = request.POST.get('email')

        if email:

            Newsletter.objects.get_or_create(
                email=email
            )

            return JsonResponse({
                'success': True,
                'message': '✓ Thanks for subscribing!'
            })

    return JsonResponse({
        'success': False
    })