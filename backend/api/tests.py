from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Profile, Project, SkillCategory, Skill, ContactMessage

User = get_user_model()

class PortfolioApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            username="admin_test",
            email="admin_test@test.com",
            password="testpassword123",
        )
        self.profile = Profile.objects.create(
            name="Test Engineer",
            tagline="Cybersecurity Specialist",
            email="test@example.com",
        )
        self.skill_cat = SkillCategory.objects.create(name="Languages", slug="languages")
        self.skill = Skill.objects.create(category=self.skill_cat, name="Python", proficiency=95)
        self.project = Project.objects.create(
            title="Test Scanner",
            description="A test scanner project",
            technologies=["Python", "Docker"],
            is_featured=True,
        )

    def test_public_portfolio_endpoint(self):
        response = self.client.get("/api/portfolio/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("profile", response.data)
        self.assertIn("projects", response.data)
        self.assertIn("skill_categories", response.data)
        self.assertEqual(response.data["profile"]["name"], "Test Engineer")

    def test_contact_form_submission(self):
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "subject": "Collab Opportunity",
            "message": "Let's connect on a security project.",
        }
        response = self.client.post("/api/contact/", payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ContactMessage.objects.filter(email="jane@example.com").exists())

    def test_jwt_auth_and_admin_endpoints(self):
        # 1. Unauthenticated request to admin should fail
        response = self.client.get("/api/admin/dashboard-stats/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # 2. Obtain token
        token_response = self.client.post("/api/auth/token/", {
            "username": "admin_test",
            "password": "testpassword123",
        })
        self.assertEqual(token_response.status_code, status.HTTP_200_OK)
        access_token = token_response.data["access"]

        # 3. Authenticated request to stats
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")
        stats_response = self.client.get("/api/admin/dashboard-stats/")
        self.assertEqual(stats_response.status_code, status.HTTP_200_OK)
        self.assertIn("counts", stats_response.data)
        self.assertEqual(stats_response.data["counts"]["projects"], 1)

        # 4. Admin CRUD - Create Project
        new_project_payload = {
            "title": "New Cyber Tool",
            "description": "Exploit mitigation tool",
            "technologies": ["Rust", "Python"],
            "is_featured": True,
            "order": 5,
        }
        create_res = self.client.post("/api/admin/projects/", new_project_payload, format="json")
        self.assertEqual(create_res.status_code, status.HTTP_201_CREATED)
        new_id = create_res.data["id"]

        # 5. Admin CRUD - Delete Project
        delete_res = self.client.delete(f"/api/admin/projects/{new_id}/")
        self.assertEqual(delete_res.status_code, status.HTTP_204_NO_CONTENT)
