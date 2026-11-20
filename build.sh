#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -o errexit

echo "==> 1. Building React 3D Cyberpunk Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "==> 2. Installing Python Backend Dependencies..."
cd backend
pip install -r requirements.txt

echo "==> 3. Running Database Migrations & Hydrating Data..."
python manage.py migrate
python manage.py loaddata api/fixtures/initial_data.json || true

echo "==> Build complete and ready for deployment!"
