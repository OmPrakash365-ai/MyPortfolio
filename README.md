# Extreme Cinematic 3D Cyberpunk Portfolio & Security Operations Console

A cinematic, immersive, responsive 3D personal portfolio and full-stack Admin Control Plane representing **Om Prakash — Software Developer & Cybersecurity Specialist**, transformed into an **Extreme Cinematic 3D Cyberpunk Universe**.

Built with **React 18 + Three.js + React Three Fiber + Drei + Tailwind CSS** on the frontend and a **Python Django REST Framework** backend with **SimpleJWT authentication** and dynamic database synchronization.

The portfolio is **100% manageable manually through the Admin Dashboard** without touching source code.

---

## 🌌 Extreme 3D Cyberpunk Universe Architecture

- **Full-Screen 3D Universe Environment ([`CanvasBackground.jsx`](file:///Users/omprakash/Desktop/Portfolio/frontend/src/components/3d/CanvasBackground.jsx))**:
  - Deep-space starfield with thousands of twinkling stellar points.
  - Floating cyan, electric blue, and purple cyber particles with mouse-responsive drift.
  - Rotating distant cyber planet with wireframe atmospheric mesh and orbital rings.
  - Floating 3D wireframe octahedrons and icosahedrons drifting in deep space.
  - Volumetric ambient, point, and directional cyan/purple lighting.
  - Interactive mouse-controlled camera movement and smooth scroll depth transitions.
- **Cinematic 3D Hero Profile ([`HeroProfile3D.jsx`](file:///Users/omprakash/Desktop/Portfolio/frontend/src/components/3d/HeroProfile3D.jsx))**:
  - **Your Real Uploaded Photo** (`profile.avatar`) served directly from Django media.
  - **Aspect-Ratio Guarantee**: Rendered inside a dark stage with `object-fit: contain` and `object-position: center` so your face is **never stretched, distorted, or cropped**.
  - **Dual Concentric Orbital Rings**: Counter-rotating dashed cyber rings with orbiting neon tech nodes.
  - **Hologram Frame & Pedestal**: Neon ambient glow aura, glowing bottom pedestal, cybernetic corner reticles, and subtle hologram scanlines.
  - **Floating Cyber Holograms**: `DEFENSE PROTOCOL // OK`, `FULL-STACK ARCHITECTURE`, `ZERO-TRUST VERIFIED`.
  - **Hardware-Accelerated Mouse Tilt**: Smooth 3D tilt tracking the cursor in real time.
- **3D Technology Globe ([`SkillsSphere3D.jsx`](file:///Users/omprakash/Desktop/Portfolio/frontend/src/components/3d/SkillsSphere3D.jsx))**:
  - Interactive 3D wireframe globe with 48 glowing surface nodes and dual planetary rings.
  - **OrbitControls**: Click and drag to rotate the technology sphere in real time.
- **Holographic Security Core ([`AboutSphere3D.jsx`](file:///Users/omprakash/Desktop/Portfolio/frontend/src/components/3d/AboutSphere3D.jsx))**:
  - Spinning 3D holographic security core with interlocking torus energy rings and pulsing telemetry.
- **3D Global Transmission Beacon ([`ContactGlobe3D.jsx`](file:///Users/omprakash/Desktop/Portfolio/frontend/src/components/3d/ContactGlobe3D.jsx))**:
  - Rotating wireframe globe with live radio telemetry beacon in the Contact section.
- **"Digital Twin" AI Portfolio Copilot — Agent Prakash ([`AICopilot.jsx`](file:///Users/omprakash/Desktop/Portfolio/frontend/src/components/ai/AICopilot.jsx))**:
  - Floating holographic neural assistant with instant access to Om's architecture blueprints, zero-trust security research, skill proficiencies, and verified credentials.
  - Interactive quick prompts, simulated neural reasoning latency, and direct action triggers (opens project case studies, downloads verified resume PDF, jumps to transmission form).
  - Can be launched via the pulsing bottom-right beacon or through the global `⌘K` command matrix.
- **3D Tilt Card Physics ([`Card3DTilt.jsx`](file:///Users/omprakash/Desktop/Portfolio/frontend/src/components/3d/Card3DTilt.jsx))**:
  - Applied across all project cards, skill badges, experience timelines, certifications, and achievements.
  - Features smooth perspective elevation and specular radial glare following the mouse cursor.
- **Fail-Safe WebGL Error Boundary ([`ErrorBoundary3D.jsx`](file:///Users/omprakash/Desktop/Portfolio/frontend/src/components/3d/ErrorBoundary3D.jsx))**:
  - Graceful CSS/2D fallback guaranteeing zero layout breakage on devices without WebGL support.

---

## 🌟 Key Features

### 1. Public Portfolio
- **Futuristic Floating Navbar**: Transparent glassmorphism navigation, neon cyan border, active section indicators (Home, About, Skills, Projects, Experience, Education, Certifications, Achievements, Contact), search `⌘K` trigger, theme toggle, and protected Admin login button.
- **Hero Section**: 3D holographic avatar showcase with live availability badge, animated typing titles ("Software Developer | Cybersecurity Enthusiast"), Download Resume button, Explore Projects button, Contact Me CTA, social links (GitHub, LinkedIn, Instagram, Twitter), and dynamic metric counters.
- **About Me**: Interactive tabbed navigation covering Biography, Career Objectives, CTF & Security Research, and Long-Term Goals alongside a 3D security core.
- **Categorized Skills**: 3D interactive technology sphere plus categorized skill grids (Programming Languages, Cybersecurity, Frameworks, Databases, Cloud & DevOps, Developer Tools) with glowing proficiency bars and 3D tilt cards.
- **Projects Showcase**: 3D tilted project cards, filter by category, instant keyword search, featured badges, live demo and GitHub links, and detailed modal inspection with security highlights.
- **Work Experience**: Interactive vertical 3D timeline with glowing cyber lines, pulsing milestone nodes, and measurable impacts on 3D tilt cards.
- **Education**: Degree details, graduation years, GPA/honors badges, and coursework.
- **Certifications**: Industry credentials (CompTIA Security+, CEH, AWS Solutions Architect, OSWE) with verification links and document preview.
- **Achievements**: Competitive CTF victories, responsible vulnerability disclosures, and hackathon awards.
- **Resume Management**: Verified PDF preview and one-click download.
- **Encrypted Contact Form**: Real-time form validation with direct backend transmission, stored in database for the admin to view and respond.

### 2. Admin Dashboard (Full CRUD Control)
- **Secure Authentication**: Username/email and password authentication with JWT access and refresh token rotation, protected admin routes, and session persistence.
- **Dashboard Overview**: Dynamic statistics cards (total projects, skills, certs, experience, unread inquiries), quick action buttons, and recent message previews.
- **Profile Management**: Live configuration of name, professional tagline, animated typing titles, short intro, biography, career objectives, contact details, metrics, and avatar image upload.
- **Projects CRUD**: Create, edit, and delete projects with image uploads, technology tag builder, category assignment, bulleted feature list, and security highlights.
- **Skills CRUD**: Add, edit, and delete skills, assign to categories, adjust proficiency meters (1-100%), and manage skill categories.
- **Experience CRUD**: Add, edit, and delete employment milestones with responsibilities and impact bullet builders.
- **Education & Certifications CRUD**: Maintain academic degrees and verified credentials with credential IDs and validation URLs.
- **Achievements & Social Links CRUD**: Add awards and customize social media profiles (GitHub, LinkedIn, Twitter/X, Hack The Box, TryHackMe, etc.).
- **Resume PDF Management**: Upload new PDF resume versions and toggle active copy.
- **Inquiry Inbox**: View received contact form inquiries, toggle read/unread status, and initiate direct email replies.

---

## 🛠️ Technology Stack

- **3D Graphics & Animations**: Three.js (`three`), React Three Fiber (`@react-three/fiber`), React Three Drei (`@react-three/drei`), Framer Motion, CSS 3D transforms.
- **Frontend**: React 18, Tailwind CSS, Lucide React icons, Axios, Vite.
- **Backend**: Python 3, Django 4.2 LTS, Django REST Framework, SimpleJWT (JSON Web Tokens), Django CORS Headers, Pillow.
- **Database**: SQLite3 (default local) / PostgreSQL (production configured via `.env`).

- **Frontend**: React 18, Tailwind CSS, Lucide React icons, Vite, Axios.
- **Typography**: Google Fonts (`Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`).
- **Backend**: Python 3, Django 4.2 LTS, Django REST Framework, SimpleJWT (JSON Web Tokens), Django CORS Headers, Pillow.
- **Database**: SQLite3 (default local) / PostgreSQL (production configured via `.env`).

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python 3.9+
- Node.js 18+ and npm

### 2. Backend Setup

```bash
# 1. Activate the Python virtual environment
source venv/bin/activate

# 2. Navigate to backend directory
cd backend

# 3. Apply database migrations
python manage.py migrate

# 4. Seed the database with comprehensive initial data and admin account
python manage.py seed_portfolio

# 5. Start the backend server
python manage.py runserver 127.0.0.1:8000
```

### 3. Frontend Setup

In a new terminal window:

```bash
cd frontend

# Run Vite development server with hot-reload and proxy to Django
npm run dev
```

Visit:
- **Public Portfolio**: [http://localhost:5173/](http://localhost:5173/) or [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin) or [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

---

## 🔑 Default Admin Credentials

- **Username**: `admin`
- **Email**: `admin@portfolio.com`
- **Password**: `adminpassword123`

You can change these credentials or create additional superusers anytime via:
```bash
python manage.py createsuperuser
```

---

## 🗄️ PostgreSQL Setup (Optional)

To connect to a production PostgreSQL database, update `backend/.env`:

```env
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=yourdomain.com,localhost,127.0.0.1
CORS_ALLOW_ALL_ORIGINS=False

# PostgreSQL Configuration
DB_ENGINE=django.db.backends.postgresql
DB_NAME=portfolio_db
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432
```

Install `psycopg2-binary` if using PostgreSQL:
```bash
./venv/bin/pip install psycopg2-binary
```

---

## 📡 API Endpoints Reference

### Public Endpoints
- `GET /api/portfolio/` - Aggregated portfolio payload (Profile, Projects, Skills, Experience, Education, Certifications, Achievements, Socials, Active Resume).
- `GET /api/projects/` - Filter projects (`?category=`, `?q=`, `?featured=`).
- `GET /api/projects/<slug>/` - Project details.
- `POST /api/contact/` - Submit contact message.
- `GET /api/resume/download/` - Download active verified resume PDF.

### Authentication Endpoints
- `POST /api/auth/token/` - Obtain JWT access and refresh tokens.
- `POST /api/auth/token/refresh/` - Refresh expired access token.
- `GET /api/auth/me/` - Get authenticated user profile.

### Admin Endpoints (Protected by JWT & Staff Permission)
- `GET, PUT /api/admin/profile/` - Profile and bio configuration.
- `GET /api/admin/dashboard-stats/` - Aggregated metrics and unread counts.
- `CRUD /api/admin/projects/` - Project management.
- `CRUD /api/admin/project-categories/` - Category management.
- `CRUD /api/admin/skills/` - Technical skills.
- `CRUD /api/admin/skill-categories/` - Skill categories.
- `CRUD /api/admin/experiences/` - Career milestones.
- `CRUD /api/admin/educations/` - Academic degrees.
- `CRUD /api/admin/certifications/` - Certifications and credentials.
- `CRUD /api/admin/achievements/` - Awards and recognitions.
- `CRUD /api/admin/social-links/` - Social links.
- `CRUD /api/admin/resumes/` - PDF resume uploads.
- `CRUD /api/admin/messages/` - Client inquiries inbox.

---

## 🛡️ Security Implementation
- **JWT Authorization**: Bearer tokens with automated refresh queue interceptor.
- **Password Protection**: Argon2 / PBKDF2 cryptographic hashing.
- **Input Validation**: Sanitized and validated via Django REST Framework serializers.
- **Zero-Trust Layout**: Admin routes strictly verified against Django permission classes (`IsAuthenticated`, `IsAdminUser`).
- **File Upload Protection**: Image and PDF validations with isolated media directories.
