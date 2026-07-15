
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='projects/')
    short_description = models.CharField(max_length=200)
    description = models.TextField()
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    technologies = models.CharField(max_length=300)
    CATEGORY_CHOICES = (('web', 'Web Development'),('ui', 'UI/UX Design'),('fullstack', 'Full Stack'),)
    category = models.CharField(max_length=20,choices=CATEGORY_CHOICES,default='web')
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)




    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ShowcaseProject(models.Model):

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)

    category = models.CharField(
        max_length=100
    )

    image = models.ImageField(
        upload_to='showcase/'
    )

    short_description = models.CharField(
        max_length=200
    )

    description = models.TextField()

    github_url = models.URLField(
        blank=True
    )

    live_url = models.URLField(
        blank=True
    )

    technologies = models.CharField(
        max_length=300
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title



class ProjectRequest(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20,blank=True)
    project_type = models.CharField(max_length=100)
    budget = models.CharField(max_length=100)
    timeline = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



class Newsletter(models.Model):
        email = models.EmailField(unique=True)
        subscribed_at = models.DateTimeField(auto_now_add=True)

        def __str__(self):
            return self.email



class Skill(models.Model):

    name = models.CharField(
        max_length=100
    )
    category = models.CharField(
        max_length=20,
        choices=(
            ('backend', 'Backend'),
            ('frontend', 'Frontend'),
            ('tools', 'Tools'),
        ),
        default='backend'
    )

    percentage = models.PositiveIntegerField(default=80)

    order = models.PositiveIntegerField(default=100)

    def __str__(self):
        return self.name
