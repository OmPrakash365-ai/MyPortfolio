import os
from pathlib import Path
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse, Http404, FileResponse
from django.urls import include, path, re_path
from django.views.static import serve

FRONTEND_DIST = settings.BASE_DIR.parent / "frontend" / "dist"

def serve_frontend(request):
    index_file = FRONTEND_DIST / "index.html"
    if index_file.exists():
        with open(index_file, "rb") as f:
            return HttpResponse(f.read(), content_type="text/html")
    return HttpResponse(
        "<h1>Portfolio API Online</h1><p>Frontend bundle not yet built. Run 'npm run build' inside frontend directory or run 'npm run dev'.</p>",
        content_type="text/html",
    )

def serve_assets(request, path):
    file_path = FRONTEND_DIST / "assets" / path
    if file_path.exists() and file_path.is_file():
        return FileResponse(open(file_path, "rb"))
    raise Http404("Asset not found")

def serve_profile_dist(request, path):
    file_path = FRONTEND_DIST / "profile" / path
    if file_path.exists() and file_path.is_file():
        return FileResponse(open(file_path, "rb"))
    raise Http404("Profile asset not found")

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("assets/<path:path>", serve_assets, name="frontend-assets"),
    path("profile/<path:path>", serve_profile_dist, name="frontend-profile"),
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# SPA fallback
urlpatterns += [
    re_path(r"^(?!api/|django-admin/|media/|static/|assets/).*$", serve_frontend, name="frontend-spa"),
]
