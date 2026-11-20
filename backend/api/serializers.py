from rest_framework import serializers
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


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class ProjectCategorySerializer(serializers.ModelSerializer):
    project_count = serializers.IntegerField(source="projects.count", read_only=True)

    class Meta:
        model = ProjectCategory
        fields = ["id", "name", "slug", "order", "project_count"]


class ProjectSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "category",
            "category_name",
            "category_slug",
            "description",
            "detailed_overview",
            "technologies",
            "image",
            "thumbnail",
            "github_url",
            "live_demo_url",
            "completion_date",
            "is_featured",
            "order",
            "key_features",
            "security_highlights",
            "created_at",
            "updated_at",
        ]


class SkillSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Skill
        fields = [
            "id",
            "category",
            "category_name",
            "name",
            "proficiency",
            "proficiency_label",
            "icon_name",
            "is_featured",
            "order",
        ]


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ["id", "name", "slug", "order", "icon", "skills"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = "__all__"


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "is_read", "created_at"]
        read_only_fields = ["id", "created_at"]


from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username_or_email = attrs.get("username")
        if username_or_email:
            user = User.objects.filter(
                Q(username__iexact=username_or_email) | Q(email__iexact=username_or_email)
            ).first()
            if user:
                attrs["username"] = user.username
        return super().validate(attrs)
