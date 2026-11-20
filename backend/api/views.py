from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import FileResponse, Http404
from rest_framework import generics, permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

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
from .serializers import (
    ProfileSerializer,
    ProjectCategorySerializer,
    ProjectSerializer,
    SkillCategorySerializer,
    SkillSerializer,
    ExperienceSerializer,
    EducationSerializer,
    CertificationSerializer,
    AchievementSerializer,
    SocialLinkSerializer,
    ResumeSerializer,
    ContactMessageSerializer,
)

User = get_user_model()


# -------------------------------------------------------------
# Public Views
# -------------------------------------------------------------

class PublicPortfolioOverviewView(APIView):
    """
    Returns the complete aggregated portfolio data for instant public page loading.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create(
                name="Alex Morgan",
                tagline="Software Developer & Cybersecurity Enthusiast",
                typing_titles=[
                    "Full Stack Developer",
                    "Cybersecurity Analyst",
                    "Cloud & SecOps Specialist",
                    "Penetration Tester",
                ],
            )

        social_links = SocialLink.objects.filter(is_active=True)
        skill_categories = SkillCategory.objects.prefetch_related("skills").all()
        projects = Project.objects.select_related("category").all()
        experiences = Experience.objects.all()
        educations = Education.objects.all()
        certifications = Certification.objects.all()
        achievements = Achievement.objects.all()
        active_resume = Resume.objects.filter(is_active=True).first()

        data = {
            "profile": ProfileSerializer(profile, context={"request": request}).data,
            "social_links": SocialLinkSerializer(
                social_links, many=True, context={"request": request}
            ).data,
            "skill_categories": SkillCategorySerializer(
                skill_categories, many=True, context={"request": request}
            ).data,
            "projects": ProjectSerializer(
                projects, many=True, context={"request": request}
            ).data,
            "project_categories": ProjectCategorySerializer(
                ProjectCategory.objects.all(), many=True
            ).data,
            "experiences": ExperienceSerializer(
                experiences, many=True, context={"request": request}
            ).data,
            "educations": EducationSerializer(
                educations, many=True, context={"request": request}
            ).data,
            "certifications": CertificationSerializer(
                certifications, many=True, context={"request": request}
            ).data,
            "achievements": AchievementSerializer(
                achievements, many=True, context={"request": request}
            ).data,
            "resume": (
                ResumeSerializer(active_resume, context={"request": request}).data
                if active_resume
                else None
            ),
        }
        return Response(data)


class PublicProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        qs = Project.objects.select_related("category").all()
        category = self.request.query_params.get("category")
        search = self.request.query_params.get("q")
        featured = self.request.query_params.get("featured")

        if category and category.lower() != "all":
            qs = qs.filter(Q(category__slug=category) | Q(category__name__iexact=category))
        if search:
            qs = qs.filter(
                Q(title__icontains=search)
                | Q(description__icontains=search)
                | Q(technologies__icontains=search)
            )
        if featured is not None:
            is_feat = featured.lower() in ["true", "1"]
            qs = qs.filter(is_featured=is_feat)

        return qs


class PublicProjectDetailView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"

    def get_object(self):
        lookup = self.kwargs.get("slug")
        try:
            if lookup.isdigit():
                return Project.objects.get(pk=lookup)
            return Project.objects.get(slug=lookup)
        except Project.DoesNotExist:
            raise Http404("Project not found")


class ContactMessageCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # Basic spam check
        data = request.data.copy()
        if not data.get("name") or not data.get("email") or not data.get("message"):
            return Response(
                {"error": "Name, email, and message are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Thank you! Your message has been received."},
            status=status.HTTP_201_CREATED,
        )


class ResumeDownloadView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        resume = Resume.objects.filter(is_active=True).first()
        if not resume or not resume.file:
            raise Http404("Active resume not found")
        return FileResponse(resume.file.open("rb"), as_attachment=True, filename=resume.file.name.split("/")[-1])


# -------------------------------------------------------------
# Admin Auth & User Views
# -------------------------------------------------------------

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        })


class AdminDashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        total_projects = Project.objects.count()
        featured_projects = Project.objects.filter(is_featured=True).count()
        total_skills = Skill.objects.count()
        total_certifications = Certification.objects.count()
        total_experience = Experience.objects.count()
        total_education = Education.objects.count()
        total_achievements = Achievement.objects.count()
        total_messages = ContactMessage.objects.count()
        unread_messages = ContactMessage.objects.filter(is_read=False).count()

        recent_messages = ContactMessageSerializer(
            ContactMessage.objects.all()[:5], many=True
        ).data

        recent_projects = ProjectSerializer(
            Project.objects.all()[:5], many=True, context={"request": request}
        ).data

        return Response({
            "counts": {
                "projects": total_projects,
                "featured_projects": featured_projects,
                "skills": total_skills,
                "certifications": total_certifications,
                "experience": total_experience,
                "education": total_education,
                "achievements": total_achievements,
                "messages": total_messages,
                "unread_messages": unread_messages,
            },
            "recent_messages": recent_messages,
            "recent_projects": recent_projects,
        })


# -------------------------------------------------------------
# Admin CRUD ViewSets
# -------------------------------------------------------------

class AdminProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create(name="Alex Morgan")
        serializer = ProfileSerializer(profile, context={"request": request})
        return Response(serializer.data)

    def put(self, request):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create(name="Alex Morgan")
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def patch(self, request):
        return self.put(request)


class AdminProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminProjectCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminSkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminSkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminEducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminCertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminAchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminSocialLinkViewSet(viewsets.ModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class AdminResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def perform_create(self, serializer):
        # If marked active, deactivate others
        is_active = serializer.validated_data.get("is_active", True)
        if is_active:
            Resume.objects.update(is_active=False)
        serializer.save(is_active=is_active)

    def perform_update(self, serializer):
        is_active = serializer.validated_data.get("is_active", False)
        if is_active:
            Resume.objects.exclude(pk=serializer.instance.pk).update(is_active=False)
        serializer.save()


class AdminContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
