from django.db import models
from django.utils.text import slugify


class Profile(models.Model):
    name = models.CharField(max_length=120, default="Alex Morgan")
    tagline = models.CharField(
        max_length=255,
        default="Software Developer & Cybersecurity Specialist",
    )
    typing_titles = models.JSONField(
        default=list,
        help_text="List of titles for the animated typing effect",
    )
    short_intro = models.TextField(
        default="Passionate Full Stack Developer and Security Enthusiast specializing in crafting resilient architectures, secure web applications, and intuitive user experiences."
    )
    about_biography = models.TextField(
        blank=True,
        default="I am a software engineer with a deep passion for cybersecurity, backend architecture, and high-performance web systems. With experience building scalable microservices and auditing security postures, I bring a unique blend of development prowess and defensive security mindset to every project."
    )
    career_objectives = models.TextField(
        blank=True,
        default="To architect and engineer mission-critical systems that are robust, inherently secure, and delight users with seamless performance."
    )
    professional_summary = models.TextField(
        blank=True,
        default="Multi-faceted engineer proficient in Python/Django, React, cloud infrastructure, and penetration testing methodologies with track record of secure delivery."
    )
    personal_interests = models.TextField(
        blank=True,
        default="Capture The Flag (CTF) challenges, open-source security tooling, cryptography, IoT hacking, and mentoring aspiring developers."
    )
    career_goals = models.TextField(
        blank=True,
        default="Lead security engineering teams in creating next-generation autonomous defense tooling and resilient cloud platforms."
    )
    avatar = models.ImageField(upload_to="profile/", blank=True, null=True)
    hero_image = models.ImageField(upload_to="profile/", blank=True, null=True)
    email = models.EmailField(default="alex.morgan.dev@example.com")
    phone = models.CharField(max_length=50, default="+1 (555) 382-9014")
    location = models.CharField(max_length=120, default="San Francisco, CA / Remote")
    open_to_work = models.BooleanField(default=True)
    years_of_experience = models.PositiveIntegerField(default=4)
    projects_completed = models.PositiveIntegerField(default=28)
    technologies_mastered = models.PositiveIntegerField(default=22)
    security_assessments = models.PositiveIntegerField(default=45)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile - {self.name}"

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"


class ProjectCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "Project Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(
        ProjectCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="projects",
    )
    description = models.TextField(help_text="Short summary for project card")
    detailed_overview = models.TextField(
        blank=True, help_text="In-depth explanation and architecture"
    )
    technologies = models.JSONField(
        default=list, help_text="Array of tech strings e.g. ['React', 'Django']"
    )
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    thumbnail = models.ImageField(upload_to="projects/thumbnails/", blank=True, null=True)
    github_url = models.URLField(blank=True, default="")
    live_demo_url = models.URLField(blank=True, default="")
    completion_date = models.DateField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    key_features = models.JSONField(
        default=list, blank=True, help_text="List of key feature bullet points"
    )
    security_highlights = models.TextField(
        blank=True, help_text="Security measures, vulnerability mitigations, encryption"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-completion_date", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "project"
            slug = base_slug
            counter = 1
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class SkillCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    order = models.IntegerField(default=0)
    icon = models.CharField(max_length=50, default="Code", help_text="Lucide icon name")

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "Skill Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(
        SkillCategory, on_delete=models.CASCADE, related_name="skills"
    )
    name = models.CharField(max_length=100)
    proficiency = models.PositiveIntegerField(
        default=85, help_text="Percentage proficiency 1-100"
    )
    proficiency_label = models.CharField(
        max_length=50, default="Advanced", blank=True
    )
    icon_name = models.CharField(
        max_length=60, default="Terminal", help_text="Lucide icon name or tag"
    )
    is_featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "-proficiency", "name"]

    def __str__(self):
        return f"{self.name} ({self.proficiency}%)"


class Experience(models.Model):
    EMPLOYMENT_TYPES = [
        ("Full-time", "Full-time"),
        ("Part-time", "Part-time"),
        ("Contract", "Contract"),
        ("Internship", "Internship"),
        ("Freelance", "Freelance"),
    ]

    company = models.CharField(max_length=150)
    job_title = models.CharField(max_length=150)
    employment_type = models.CharField(
        max_length=50, choices=EMPLOYMENT_TYPES, default="Full-time"
    )
    location = models.CharField(max_length=120, default="Remote")
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    responsibilities = models.JSONField(
        default=list, help_text="List of bullet responsibilities"
    )
    achievements = models.JSONField(
        default=list, help_text="List of bullet achievements"
    )
    technologies = models.JSONField(
        default=list, blank=True, help_text="Tech stack used"
    )
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "-start_date"]

    def __str__(self):
        return f"{self.job_title} at {self.company}"


class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=150)
    course = models.CharField(
        max_length=150, help_text="e.g. Computer Science & Information Security"
    )
    start_year = models.CharField(max_length=20)
    graduation_year = models.CharField(max_length=20)
    cgpa = models.CharField(max_length=50, blank=True, default="3.9 / 4.0")
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "-graduation_year"]
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=150)
    issue_date = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=150, blank=True)
    credential_url = models.URLField(blank=True, default="")
    badge_image = models.ImageField(
        upload_to="certifications/badges/", blank=True, null=True
    )
    certificate_file = models.FileField(
        upload_to="certifications/docs/", blank=True, null=True
    )
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "-issue_date"]

    def __str__(self):
        return f"{self.name} ({self.issuing_organization})"


class Achievement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    organization_or_event = models.CharField(max_length=150, blank=True)
    supporting_image = models.ImageField(
        upload_to="achievements/", blank=True, null=True
    )
    supporting_document = models.FileField(
        upload_to="achievements/docs/", blank=True, null=True
    )
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order", "-date"]

    def __str__(self):
        return self.title


class SocialLink(models.Model):
    PLATFORM_CHOICES = [
        ("github", "GitHub"),
        ("linkedin", "LinkedIn"),
        ("twitter", "Twitter / X"),
        ("instagram", "Instagram"),
        ("youtube", "YouTube"),
        ("discord", "Discord"),
        ("medium", "Medium"),
        ("hackthebox", "Hack The Box"),
        ("tryhackme", "TryHackMe"),
        ("other", "Other"),
    ]

    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES, default="github")
    title = models.CharField(max_length=100, blank=True)
    url = models.URLField()
    icon_name = models.CharField(max_length=50, default="Github")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "platform"]

    def save(self, *args, **kwargs):
        if not self.title:
            self.title = self.get_platform_display()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.platform}: {self.url}"


class Resume(models.Model):
    title = models.CharField(
        max_length=200, default="Alex Morgan - Software & Security Resume"
    )
    file = models.FileField(upload_to="resumes/")
    is_active = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
