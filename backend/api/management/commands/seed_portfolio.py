import os
from datetime import date
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from api.models import (
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

User = get_user_model()

class Command(BaseCommand):
    help = "Seeds database with comprehensive initial portfolio data and admin account"

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting database seeding...")

        # 1. Ensure admin user exists with active credentials
        admin_user, created = User.objects.get_or_create(username="admin")
        admin_user.email = "admin@portfolio.com"
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.set_password(os.getenv("ADMIN_PASSWORD", "adminpassword123"))
        admin_user.save()
        self.stdout.write(self.style.SUCCESS("Admin user verified and password active."))

        # 2. Seed Profile
        profile, _ = Profile.objects.get_or_create(pk=1)
        profile.name = "Om Prakash"
        profile.tagline = "Software Developer & Cybersecurity Specialist"
        profile.typing_titles = [
            "Full Stack Software Developer",
            "Cybersecurity Enthusiast",
            "Penetration Tester & Ethical Hacker",
            "Cloud Architect & DevSecOps Engineer",
        ]
        profile.short_intro = (
            "Architecting resilient, production-grade applications with modern React and Django backends, "
            "coupled with an offensive and defensive cybersecurity mindset to protect digital ecosystems."
        )
        profile.about_biography = (
            "I am a passionate Software Developer and Cybersecurity Specialist dedicated to engineering "
            "reliable, high-performance web systems and resilient cloud infrastructure. I bridge the gap "
            "between agile software development and defensive security operations—ensuring every line of code "
            "is not just functional, but systematically fortified against modern threats.\n\n"
            "With deep expertise in Python, Django REST Framework, modern React, and cloud architectures, "
            "I enjoy unraveling complex distributed systems, executing vulnerability assessments, and building "
            "user interfaces that are both aesthetically stunning and blazing fast."
        )
        profile.career_objectives = (
            "To architect and build mission-critical, highly available cloud systems with inherent zero-trust security, "
            "delivering seamless digital experiences that scale globally."
        )
        profile.professional_summary = (
            "Versatile engineer with 4+ years of hands-on experience in full-stack architecture, automated security testing, "
            "OWASP mitigation, and continuous delivery. Proven track record of shipping performant web apps and mitigating high-risk vulnerabilities."
        )
        profile.personal_interests = (
            "Participating in international CTF competitions (HackTheBox, TryHackMe), reverse-engineering protocols, "
            "open-source security tooling, cryptography research, and mentoring emerging tech talent."
        )
        profile.career_goals = (
            "Lead engineering and security teams to build state-of-the-art secure applications, publish impactful security research, "
            "and contribute to foundational open-source privacy frameworks."
        )
        profile.email = "omprakash.devsec@example.com"
        profile.phone = "+1 (555) 729-4102"
        profile.location = "San Francisco, CA / Remote"
        profile.open_to_work = True
        profile.avatar = "profile/omprakash_portrait.jpg"
        profile.years_of_experience = 4
        profile.projects_completed = 32
        profile.technologies_mastered = 24
        profile.security_assessments = 50
        profile.save()
        self.stdout.write(self.style.SUCCESS("Profile seeded."))

        # 3. Project Categories
        cat_cyber, _ = ProjectCategory.objects.get_or_create(
            slug="cybersecurity",
            defaults={"name": "Cybersecurity & Security Tools", "order": 1},
        )
        cat_fullstack, _ = ProjectCategory.objects.get_or_create(
            slug="full-stack",
            defaults={"name": "Full Stack Applications", "order": 2},
        )
        cat_cloud, _ = ProjectCategory.objects.get_or_create(
            slug="cloud-devsecops",
            defaults={"name": "Cloud & DevSecOps", "order": 3},
        )
        cat_network, _ = ProjectCategory.objects.get_or_create(
            slug="network-security",
            defaults={"name": "Network Security & Monitoring", "order": 4},
        )

        # 4. Seed Projects
        projects_data = [
            {
                "title": "SentinelGuard: Automated Vulnerability Scanner & Threat Hub",
                "slug": "sentinelguard-vulnerability-scanner",
                "category": cat_cyber,
                "description": "Enterprise-grade automated vulnerability assessment engine that coordinates asynchronous Nmap port sweeps, SSL/TLS audit tests, and OWASP Top 10 scans with real-time alerting.",
                "detailed_overview": "SentinelGuard provides a single pane of glass for security teams to schedule passive and active scans against perimeter servers. Built with Django, Celery, and Redis for distributed queue management, with a high-speed React dashboard rendering interactive threat telemetry.",
                "technologies": ["Python", "Django REST Framework", "React", "Tailwind CSS", "Celery", "Redis", "Docker", "Nmap"],
                "github_url": "https://github.com/example/sentinelguard-scanner",
                "live_demo_url": "https://sentinelguard-demo.example.com",
                "completion_date": date(2024, 8, 15),
                "is_featured": True,
                "order": 1,
                "key_features": [
                    "Automated port scanning & service fingerprinting via Nmap integration",
                    "SSL/TLS cipher strength and certificate expiry audits",
                    "CVE correlation engine pulling live NIST National Vulnerability Database feeds",
                    "Instant Slack & Webhook notifications upon high-severity risk detection",
                    "Exportable PDF/JSON executive compliance reports"
                ],
                "security_highlights": "Strict role-based access control (RBAC), end-to-end audit logging, rate-limited public APIs, and isolated Docker sandbox execution for scan workers.",
            },
            {
                "title": "AegisPay: Zero-Trust Encrypted Financial Transaction Portal",
                "slug": "aegispay-zero-trust-financial-portal",
                "category": cat_fullstack,
                "description": "Secure financial ledger and transaction processing application featuring client-side WebCrypto encryption, biometric authentication simulation, and tamper-evident audit trails.",
                "detailed_overview": "Engineered for high reliability, AegisPay ensures zero knowledge of sensitive credentials on intermediate servers by leveraging client-side asymmetric RSA-OAEP and AES-256-GCM encryption schemes.",
                "technologies": ["React", "TypeScript", "Django", "PostgreSQL", "WebCrypto API", "Tailwind CSS", "JWT"],
                "github_url": "https://github.com/example/aegispay-portal",
                "live_demo_url": "https://aegispay-demo.example.com",
                "completion_date": date(2024, 5, 20),
                "is_featured": True,
                "order": 2,
                "key_features": [
                    "Client-side envelope encryption before dispatching transaction records",
                    "Multi-factor authentication (MFA / TOTP) with backup emergency codes",
                    "Real-time fraud anomaly scoring and suspicious IP velocity checks",
                    "Immutable audit logs with cryptographic hash-chain verification",
                    "Responsive glassmorphism dashboard with interactive balance charts"
                ],
                "security_highlights": "PCI-DSS aligned data handling, PBKDF2 password derivation, strict Content Security Policy (CSP), and automated CSRF/XSS defense layers.",
            },
            {
                "title": "CyberSentinel SIEM & Real-Time Log Analyzer",
                "slug": "cybersentinel-siem-log-analyzer",
                "category": cat_cyber,
                "description": "High-throughput Security Information and Event Management (SIEM) dashboard that ingests syslog streams, parses auth failures, and detects brute-force incursions.",
                "detailed_overview": "CyberSentinel ingests thousands of log lines per minute from Linux and Windows servers, applying regex rules and heuristic correlation to detect brute force attempts, unauthorized privilege escalations, and beaconing behaviors.",
                "technologies": ["Python", "FastAPI", "React", "Elasticsearch", "Tailwind CSS", "WebSockets"],
                "github_url": "https://github.com/example/cybersentinel-siem",
                "live_demo_url": "https://cybersentinel.example.com",
                "completion_date": date(2024, 2, 10),
                "is_featured": True,
                "order": 3,
                "key_features": [
                    "Real-time WebSocket streaming of inbound authentication and network events",
                    "Interactive incident timeline with geo-IP lookup mapping attacker origins",
                    "Configurable alert thresholds for repeated SSH and RDP failed handshakes",
                    "One-click IP firewall ban script generator"
                ],
                "security_highlights": "Encrypted syslog-ng ingestion pipes, sanitized queries to prevent injection attacks, and scoped analyst privileges.",
            },
            {
                "title": "CloudShield: DevSecOps CI/CD Vulnerability Pipeline",
                "slug": "cloudshield-devsecops-pipeline",
                "category": cat_cloud,
                "description": "Automated security orchestration toolkit integrated into GitHub Actions, enforcing SAST, DAST, dependency review, and container image scans before production rollout.",
                "detailed_overview": "Designed to shift security left, CloudShield blocks non-compliant commits by evaluating code against Semgrep rules, Trivy container scans, and OWASP ZAP baseline web tests, preventing secret leaks and CVE propagation.",
                "technologies": ["Docker", "GitHub Actions", "Python", "Trivy", "SonarQube", "Kubernetes", "Shell"],
                "github_url": "https://github.com/example/cloudshield-pipeline",
                "live_demo_url": "https://cloudshield-docs.example.com",
                "completion_date": date(2023, 11, 30),
                "is_featured": False,
                "order": 4,
                "key_features": [
                    "Automated git pre-commit hooks intercepting exposed API keys and private certificates",
                    "Trivy integration failing builds with Critical or High severity container CVEs",
                    "Automated pull request annotations directly tagging vulnerable source lines",
                    "Standardized SBOM (Software Bill of Materials) generation in SPDX and CycloneDX"
                ],
                "security_highlights": "Enforces least-privilege cloud IAM roles, signed commits verification, and secure container image provenance.",
            },
            {
                "title": "PacketSleuth: Network Traffic Inspector & Anomaly Detector",
                "slug": "packetsleuth-traffic-inspector",
                "category": cat_network,
                "description": "Python Scapy-based network analysis tool providing real-time protocol breakdown, ARP spoofing detection, and DNS exfiltration monitoring.",
                "detailed_overview": "PacketSleuth runs lightweight packet capture probes across local network interfaces, decomposing TCP/UDP traffic into interactive visual bandwidth graphs and alerting on anomalous DNS tunneling patterns.",
                "technologies": ["Python", "Scapy", "React", "Chart.js", "WebSockets", "SQLite"],
                "github_url": "https://github.com/example/packetsleuth",
                "live_demo_url": "https://packetsleuth.example.com",
                "completion_date": date(2023, 7, 18),
                "is_featured": False,
                "order": 5,
                "key_features": [
                    "Heuristic detection of ARP cache poisoning and man-in-the-middle attacks",
                    "DNS entropy calculator identifying base64 encoded data exfiltration",
                    "Bandwidth protocol pie charts and active connection tracker",
                    "PCAP capture file export and replay functionality"
                ],
                "security_highlights": "Memory-safe packet decoding routines with zero execution risk from malformed network packets.",
            },
            {
                "title": "SecureVault: Multi-Tenant Team Password & Key Manager",
                "slug": "securevault-password-manager",
                "category": cat_fullstack,
                "description": "Self-hosted zero-knowledge credential manager designed for engineering teams to share environment variables, SSH keys, and service credentials securely.",
                "detailed_overview": "Implements modern cryptographic vaults where secrets are encrypted with a client-derived master key before reaching the database, complete with granular team permissions and expiration timers.",
                "technologies": ["React", "Django REST Framework", "PostgreSQL", "Tailwind CSS", "CryptoJS"],
                "github_url": "https://github.com/example/securevault",
                "live_demo_url": "https://securevault.example.com",
                "completion_date": date(2023, 3, 25),
                "is_featured": True,
                "order": 6,
                "key_features": [
                    "Client-side master password hashing using Argon2id and AES-256",
                    "Granular folder-level access control for engineering teams and contractors",
                    "Self-destructing secret sharing links with one-time view limits",
                    "Password health analysis detecting reused or compromised credentials"
                ],
                "security_highlights": "Zero server knowledge of plaintext secrets, session auto-lock timers, and comprehensive activity logging.",
            },
        ]

        for p_data in projects_data:
            Project.objects.update_or_create(
                slug=p_data["slug"],
                defaults=p_data,
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(projects_data)} projects."))

        # 5. Skill Categories & Skills
        skill_cats = [
            ("Programming Languages", "languages", 1, "Code", [
                ("Python", 95, "Expert", "Terminal"),
                ("JavaScript / TypeScript", 90, "Advanced", "Code"),
                ("C / C++", 78, "Proficient", "Cpu"),
                ("Bash / Shell Scripting", 88, "Advanced", "Terminal"),
                ("SQL (PostgreSQL / SQLite)", 86, "Advanced", "Database"),
                ("HTML5 & Modern CSS3", 94, "Expert", "Layout"),
            ]),
            ("Cybersecurity", "cybersecurity", 2, "Shield", [
                ("Penetration Testing & Ethical Hacking", 92, "Expert", "ShieldAlert"),
                ("OWASP Top 10 Vulnerability Remediation", 95, "Expert", "ShieldCheck"),
                ("Network Security & Packet Analysis", 88, "Advanced", "Activity"),
                ("Applied Cryptography & SSL/TLS", 85, "Advanced", "Lock"),
                ("Vulnerability Assessment (Nmap/Burp)", 92, "Expert", "Search"),
                ("Incident Response & Threat Analysis", 80, "Proficient", "AlertTriangle"),
            ]),
            ("Frameworks & Libraries", "frameworks", 3, "Layers", [
                ("React.js & Next.js", 92, "Expert", "Component"),
                ("Django & Django REST Framework", 95, "Expert", "Server"),
                ("FastAPI", 85, "Advanced", "Zap"),
                ("Tailwind CSS", 96, "Expert", "Palette"),
                ("Node.js & Express", 82, "Advanced", "Boxes"),
            ]),
            ("Databases & Caching", "databases", 4, "Database", [
                ("PostgreSQL", 90, "Expert", "Database"),
                ("Redis (Cache & Message Broker)", 85, "Advanced", "Layers"),
                ("MongoDB", 80, "Proficient", "Server"),
                ("SQLite", 90, "Expert", "HardDrive"),
            ]),
            ("Cloud & DevSecOps", "cloud-devops", 5, "Cloud", [
                ("Docker & Containerization", 90, "Expert", "Box"),
                ("AWS Cloud Services (EC2, S3, IAM)", 84, "Advanced", "Cloud"),
                ("CI/CD Pipeline Security (GitHub Actions)", 88, "Advanced", "GitBranch"),
                ("Linux Server Administration", 92, "Expert", "Terminal"),
                ("Kubernetes Basics", 75, "Proficient", "Layers"),
            ]),
            ("Developer & Security Tools", "developer-tools", 6, "Wrench", [
                ("Burp Suite & ZAP Proxy", 90, "Expert", "Shield"),
                ("Wireshark & Tcpdump", 88, "Advanced", "Radio"),
                ("Git & GitHub", 95, "Expert", "GitCommit"),
                ("Metasploit Framework", 82, "Proficient", "Terminal"),
                ("Postman & REST Client", 92, "Expert", "Send"),
                ("VS Code & Linux CLI", 96, "Expert", "Monitor"),
            ]),
            ("Other Technologies", "other-tech", 7, "Cpu", [
                ("Zero Trust Architecture", 86, "Advanced", "Shield"),
                ("RESTful & WebSocket APIs", 94, "Expert", "Zap"),
                ("Agile & Scrum Methodologies", 90, "Advanced", "Users"),
                ("UI/UX Design & Prototyping", 84, "Advanced", "Figma"),
            ]),
        ]

        for cat_name, cat_slug, cat_order, cat_icon, skills in skill_cats:
            category, _ = SkillCategory.objects.get_or_create(
                slug=cat_slug,
                defaults={"name": cat_name, "order": cat_order, "icon": cat_icon},
            )
            for skill_name, prof, label, icon in skills:
                Skill.objects.update_or_create(
                    category=category,
                    name=skill_name,
                    defaults={
                        "proficiency": prof,
                        "proficiency_label": label,
                        "icon_name": icon,
                        "is_featured": True,
                        "order": 0,
                    },
                )
        self.stdout.write(self.style.SUCCESS("Skill categories and skills seeded."))

        # 6. Experience
        experiences_data = [
            {
                "company": "Apex Defense & Cloud Systems",
                "job_title": "Senior Full-Stack & Security Engineer",
                "employment_type": "Full-time",
                "location": "San Francisco, CA (Hybrid)",
                "start_date": date(2023, 3, 1),
                "end_date": None,
                "is_current": True,
                "responsibilities": [
                    "Spearhead architecture of core microservices using Django REST Framework and React, serving 500,000+ monthly requests.",
                    "Lead internal vulnerability audits and penetration tests, remediating 35+ high-priority vulnerabilities before production milestones.",
                    "Architect automated CI/CD security pipelines enforcing static analysis (SAST) and container vulnerability scanning.",
                    "Mentor 6 junior developers on secure coding standards, defense-in-depth principles, and modern React best practices."
                ],
                "achievements": [
                    "Decreased critical security response turnaround by 42% through automated scanning workflows.",
                    "Improved API throughput by 65% by implementing Redis caching and database query optimizations."
                ],
                "technologies": ["Python", "Django", "React", "PostgreSQL", "Docker", "AWS", "Redis"],
                "order": 1,
            },
            {
                "company": "Vanguard Security Labs",
                "job_title": "Full-Stack Developer & Security Analyst",
                "employment_type": "Full-time",
                "location": "Austin, TX (Remote)",
                "start_date": date(2021, 8, 1),
                "end_date": date(2023, 2, 28),
                "is_current": False,
                "responsibilities": [
                    "Developed threat telemetry dashboards and interactive client security reports with React, Tailwind, and WebSockets.",
                    "Conducted web application vulnerability assessments following OWASP methodology for external enterprise clients.",
                    "Engineered role-based authentication and zero-trust API layers using JWT with automated token refresh protocols."
                ],
                "achievements": [
                    "Authored automated Burp Suite extension that shortened repetitive API testing tasks by 30 hours per quarter.",
                    "Achieved 100% on-time delivery across 14 consecutive client feature releases."
                ],
                "technologies": ["TypeScript", "React", "Python", "FastAPI", "PostgreSQL", "Burp Suite", "Docker"],
                "order": 2,
            },
            {
                "company": "CyberShield Dynamics",
                "job_title": "Cybersecurity & Software Engineering Intern",
                "employment_type": "Internship",
                "location": "San Jose, CA",
                "start_date": date(2020, 6, 1),
                "end_date": date(2021, 6, 30),
                "is_current": False,
                "responsibilities": [
                    "Assisted the blue team with log analysis, SIEM rule tuning, and firewall configuration reviews.",
                    "Developed internal Python scripting tools for automated parsing of server access logs and detection of port sweeps.",
                    "Participated in disaster recovery drills and incident response playbooks formulation."
                ],
                "achievements": [
                    "Received Intern Innovation Award for creating an automated credential leak alert scanner."
                ],
                "technologies": ["Python", "Bash", "Linux", "Elasticsearch", "Git", "Wireshark"],
                "order": 3,
            },
        ]

        Experience.objects.all().delete()
        for exp in experiences_data:
            Experience.objects.create(**exp)
        self.stdout.write(self.style.SUCCESS("Experiences seeded."))

        # 7. Education
        Education.objects.all().delete()
        Education.objects.create(
            institution="California State University",
            degree="Bachelor of Science in Computer Science",
            course="Concentration in Information Security & Software Engineering",
            start_year="2017",
            graduation_year="2021",
            cgpa="3.92 / 4.00 (Summa Cum Laude)",
            description="Graduated with highest honors. Coursework: Cryptography, Operating Systems, Computer Networks, Database Systems, Ethical Hacking, Algorithms & Data Structures. Captain of the University Cyber Defense & CTF Team.",
            order=1,
        )
        self.stdout.write(self.style.SUCCESS("Education seeded."))

        # 8. Certifications
        certifications_data = [
            {
                "name": "CompTIA Security+ (SY0-601)",
                "issuing_organization": "CompTIA",
                "issue_date": date(2022, 4, 12),
                "credential_id": "COMP001021948",
                "credential_url": "https://www.credly.com/org/comptia",
                "order": 1,
            },
            {
                "name": "Certified Ethical Hacker (CEH v12)",
                "issuing_organization": "EC-Council",
                "issue_date": date(2023, 1, 18),
                "credential_id": "ECC938210492",
                "credential_url": "https://aspen.eccouncil.org/verify",
                "order": 2,
            },
            {
                "name": "AWS Certified Solutions Architect – Associate",
                "issuing_organization": "Amazon Web Services",
                "issue_date": date(2023, 9, 5),
                "credential_id": "AWS-PSA-839210",
                "credential_url": "https://aws.amazon.com/verification",
                "order": 3,
            },
            {
                "name": "OffSec Web Expert (OSWE Prep & Completed Labs)",
                "issuing_organization": "Offensive Security",
                "issue_date": date(2024, 3, 20),
                "credential_id": "OS-74921",
                "credential_url": "https://www.offensive-security.com",
                "order": 4,
            },
        ]

        Certification.objects.all().delete()
        for cert in certifications_data:
            Certification.objects.create(**cert)
        self.stdout.write(self.style.SUCCESS("Certifications seeded."))

        # 9. Achievements
        achievements_data = [
            {
                "title": "1st Place Winner - Regional Cyber Defense Collegiate Competition",
                "organization_or_event": "National Cyber League / Collegiate Cyber Defense",
                "date": date(2023, 10, 14),
                "description": "Led a team of 4 engineers defending enterprise network topologies against aggressive red team adversary attacks in an intense 48-hour live competition.",
                "order": 1,
            },
            {
                "title": "Responsible Security Vulnerability Disclosure Hall of Fame",
                "organization_or_event": "Open Source Foundation & Major Web Platforms",
                "date": date(2023, 4, 10),
                "description": "Identified and responsibly disclosed critical cross-origin authentication bypasses and SSRF vulnerabilities in widely deployed open-source frameworks.",
                "order": 2,
            },
            {
                "title": "Best Enterprise Security Solution - Global FinTech Hackathon",
                "organization_or_event": "FinTech Innovators Alliance",
                "date": date(2022, 11, 22),
                "description": "Engineered a zero-knowledge transaction validator prototype that won 1st prize out of 120+ international engineering teams.",
                "order": 3,
            },
            {
                "title": "Academic Excellence & Outstanding Leadership Award",
                "organization_or_event": "Department of Computer Science",
                "date": date(2021, 5, 15),
                "description": "Honored as top graduating student in Computer Science for academic performance and founding the campus cybersecurity student chapter.",
                "order": 4,
            },
        ]

        Achievement.objects.all().delete()
        for ach in achievements_data:
            Achievement.objects.create(**ach)
        self.stdout.write(self.style.SUCCESS("Achievements seeded."))

        # 10. Social Links
        socials_data = [
            {"platform": "github", "title": "GitHub", "url": "https://github.com", "icon_name": "Github", "order": 1},
            {"platform": "linkedin", "title": "LinkedIn", "url": "https://linkedin.com", "icon_name": "Linkedin", "order": 2},
            {"platform": "twitter", "title": "Twitter / X", "url": "https://twitter.com", "icon_name": "Twitter", "order": 3},
            {"platform": "hackthebox", "title": "Hack The Box", "url": "https://app.hackthebox.com", "icon_name": "Box", "order": 4},
            {"platform": "tryhackme", "title": "TryHackMe", "url": "https://tryhackme.com", "icon_name": "Shield", "order": 5},
            {"platform": "medium", "title": "Medium Tech Blog", "url": "https://medium.com", "icon_name": "BookOpen", "order": 6},
        ]

        SocialLink.objects.all().delete()
        for soc in socials_data:
            SocialLink.objects.create(**soc)
        self.stdout.write(self.style.SUCCESS("Social links seeded."))

        # 11. Sample Contact Message
        ContactMessage.objects.all().delete()
        ContactMessage.objects.create(
            name="Elena Rostova",
            email="elena.rostova@cyberdefense-corp.io",
            subject="Senior Security & Full-Stack Engineering Role Inquiry",
            message="Hello Om, I came across your SentinelGuard open-source project and was very impressed with your zero-trust architecture approach. We are expanding our core application security team and would love to speak with you regarding a senior engineering leadership position.",
            is_read=False,
        )
        ContactMessage.objects.create(
            name="Marcus Chen",
            email="marcus.chen@fintech-security.com",
            subject="Security Audit Consultation Request",
            message="Hi Om, We are preparing our banking microservices for an upcoming SOC2 audit and would like to consult with you on performing pre-audit penetration testing and API vulnerability reviews.",
            is_read=True,
        )
        self.stdout.write(self.style.SUCCESS("Sample contact messages seeded."))

        self.stdout.write(self.style.SUCCESS("DATABASE SEEDING COMPLETE!"))
