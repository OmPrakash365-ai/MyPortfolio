from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    PublicPortfolioOverviewView,
    PublicProjectListView,
    PublicProjectDetailView,
    ContactMessageCreateView,
    ResumeDownloadView,
    CurrentUserView,
    AdminDashboardStatsView,
    AdminProfileView,
    AdminProjectViewSet,
    AdminProjectCategoryViewSet,
    AdminSkillViewSet,
    AdminSkillCategoryViewSet,
    AdminExperienceViewSet,
    AdminEducationViewSet,
    AdminCertificationViewSet,
    AdminAchievementViewSet,
    AdminSocialLinkViewSet,
    AdminResumeViewSet,
    AdminContactMessageViewSet,
)

router = DefaultRouter()
router.register(r"admin/projects", AdminProjectViewSet, basename="admin-projects")
router.register(r"admin/project-categories", AdminProjectCategoryViewSet, basename="admin-project-categories")
router.register(r"admin/skills", AdminSkillViewSet, basename="admin-skills")
router.register(r"admin/skill-categories", AdminSkillCategoryViewSet, basename="admin-skill-categories")
router.register(r"admin/experiences", AdminExperienceViewSet, basename="admin-experiences")
router.register(r"admin/educations", AdminEducationViewSet, basename="admin-educations")
router.register(r"admin/certifications", AdminCertificationViewSet, basename="admin-certifications")
router.register(r"admin/achievements", AdminAchievementViewSet, basename="admin-achievements")
router.register(r"admin/social-links", AdminSocialLinkViewSet, basename="admin-social-links")
router.register(r"admin/resumes", AdminResumeViewSet, basename="admin-resumes")
router.register(r"admin/messages", AdminContactMessageViewSet, basename="admin-messages")

urlpatterns = [
    # Public endpoints
    path("portfolio/", PublicPortfolioOverviewView.as_view(), name="public-portfolio"),
    path("projects/", PublicProjectListView.as_view(), name="public-project-list"),
    path("projects/<slug>/", PublicProjectDetailView.as_view(), name="public-project-detail"),
    path("contact/", ContactMessageCreateView.as_view(), name="public-contact-create"),
    path("resume/download/", ResumeDownloadView.as_view(), name="public-resume-download"),

    # Authentication
    path("auth/token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("auth/me/", CurrentUserView.as_view(), name="auth-current-user"),

    # Admin endpoints
    path("admin/profile/", AdminProfileView.as_view(), name="admin-profile"),
    path("admin/dashboard-stats/", AdminDashboardStatsView.as_view(), name="admin-dashboard-stats"),
    path("", include(router.urls)),
]
