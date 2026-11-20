from django.contrib import admin
from .models import (
    Profile,
    ProjectCategory,
    Project,
    SkillCategory,
    Skill,
    Experience,
    Education,
    Certification,
    Achievement,
    SocialLink,
    Resume,
    ContactMessage,
)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "open_to_work", "updated_at")

@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "is_featured", "completion_date", "order")
    list_filter = ("category", "is_featured")
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order", "icon")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency", "proficiency_label", "is_featured", "order")
    list_filter = ("category", "is_featured")
    search_fields = ("name",)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("job_title", "company", "employment_type", "start_date", "end_date", "is_current")
    list_filter = ("is_current", "employment_type")

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("institution", "degree", "course", "graduation_year", "cgpa")

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("name", "issuing_organization", "issue_date", "credential_id")

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "organization_or_event", "date")

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "url", "order", "is_active")

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("title", "file", "is_active", "uploaded_at")

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject", "message")
