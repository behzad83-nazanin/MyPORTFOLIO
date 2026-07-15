from django.contrib import admin
from .models import (Project,ProjectRequest,Newsletter,ShowcaseProject)
from django.utils.html import format_html



class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title','category','image_preview','featured','created_at')
    list_filter = ('category','featured')
    search_fields = ('title','technologies')
    prepopulated_fields = {'slug': ('title',)}

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="80" height="50" style="object-fit:cover;border-radius:5px;" />',
                obj.image.url
            )
        return "-"

    image_preview.short_description = 'Image'

class ProjectRequestAdmin(admin.ModelAdmin):

    list_display = ('name','email','project_type','budget','created_at')
    search_fields = ('name','email')



from django.contrib import admin



class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('email','subscribed_at')



class ShowcaseProjectAdmin(admin.ModelAdmin):

    list_display = ('title','category','created_at')
    list_filter = ('category',)
    search_fields = ('title','technologies')
    prepopulated_fields = {'slug': ('title',)}






admin.site.register(ShowcaseProject,ShowcaseProjectAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectRequest, ProjectRequestAdmin)
admin.site.register(Newsletter, NewsletterAdmin)
